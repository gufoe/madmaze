<script lang="ts">
	import { goto } from '$app/navigation';
	import { Api, Schema } from 'onpage-js';
	import { onDestroy, onMount } from 'svelte';
	import { boundingBox, Game, getRatio, type GameRect, fraseScarsa } from './game/game';
	import Circle from './Graphics/Circle.svelte';
	import Rect from './Graphics/Rect.svelte';
	import Text from './Graphics/Text.svelte';
	import { groupBy, uniqBy } from 'lodash';

	const eventParams = { passive: false };
	document.body.addEventListener('touchcancel', ignore, eventParams);
	document.body.addEventListener('touchend', ignore, eventParams);

	function ignore(e: Event) {
		e.preventDefault();
	}

	onDestroy(() => {
		document.body.removeEventListener('touchcancel', ignore);
		document.body.removeEventListener('touchend', ignore);
	});

	let canvas: Element | undefined;
	export let game: Game;

	let scale = 1,
		map_size = { w: 1, h: 1 };
	$: {
		document.title = game?.level.key ?? 'game';
	}

	const getRectColor = (rect: GameRect) => {
		if (rect.type == 'victory') {
			if (game?.tiles.find((x) => x.type == 'checkpoint' && !x.touched)) return '#444';
			else return '#0f0';
		}
		if (rect.type == 'checkpoint') {
			if (rect.touched) return '#0ff';
			else return '#136';
		}
		return '#f00';
	};
	function setupCanvas() {
		scale = !canvas
			? 1
			: getRatio(
					{
						w: canvas.clientWidth,
						h: canvas.clientHeight,
					},
					game.tiles,
			  );
		map_size = boundingBox(game.tiles);
	}
	onMount(() => {
		setupCanvas();
	});
	onDestroy(() => {
		clearInterval(game_int);
	});

	let int: NodeJS.Timeout | undefined;
	let game_int = setInterval(() => {
		game = game.update();
		if (game.pl.status == 'dead' && !int) {
			int = setTimeout(() => {
				int = undefined;
				while (!['m', 'f', 'x'].includes(localStorage.maschio_o_femmina)) {
					localStorage.maschio_o_femmina = prompt(
						'Aspetta un attimo, tu cosa sei?\n(scrivi m per maschio, f per femmina, x per altro)',
					);
				}
				alert(fraseScarsa(localStorage.maschio_o_femmina));
				game.initGame();
				// show_restart = true;
			}, 100);
		}
		if (game.pl.status == 'victory' && !int) {
			int = setTimeout(async () => {
				const ms = game.pl.end! - game.pl.start!;

				if (game.level.challenge) {
					localStorage.username =
						prompt(
							'Hai vinto!\n' + (ms / 1000).toFixed(2) + ' secondi\nCome vuoi essere ricordato?',
							localStorage.username ?? '',
						) ?? '';
					if (localStorage.username) {
						const s = await schema();
						s.resource('hall_of_fame')
							?.writer()
							.createThing()
							.set('name', localStorage.username)
							.set('device_id', localStorage.device_id)
							.set('level', game.level.key)
							.set('time', ms)
							.save();
					}
				}
				console.log(game.pl.hit);
				if (game.pl.hit?.type == 'victory' && game.pl.hit.goto) {
					// game.initGame(MAPS[game.pl.hit.goto]);
					// setupCanvas();
					goto(`${game.pl.hit.goto}`);
				} else {
					game.initGame();
				}

				int = undefined;
			}, 300);
		}
	}, 1000 / 30);

	let __schema: Schema;
	const schema = async () => {
		if (__schema) return __schema;
		const api = new Api('app', 'bl2LG1fH7HGZLwiD');
		return (__schema = await api.loadSchema());
	};

	async function showHallOfFame(level: string) {
		let ppl = await (await schema())
			.query('hall_of_fame')
			.where('level', level)
			.orderBy('time')
			.get();
		ppl = uniqBy(ppl, (p) => p.val('device_id'));
		const message = ppl.map(
			(p) => `${((p.val<number>('time') ?? 0) / 1000).toFixed(2)}s - ${p.val('name')}`,
		);
		message.unshift('Hall of fame:');
		alert(message.join('\n'));
	}

	function handleKeyUpDown(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey) return;
		if (['w', 'ArrowUp'].includes(e.key)) {
			game.pl.movey = e.type == 'keyup' ? 0 : 1;
		}
		if (['s', 'ArrowDown'].includes(e.key)) {
			game.pl.movey = e.type == 'keyup' ? 0 : -1;
		}
		if (['a', 'ArrowLeft'].includes(e.key)) {
			game.pl.movex = e.type == 'keyup' ? 0 : -1;
		}
		if (['d', 'ArrowRight'].includes(e.key)) {
			game.pl.movex = e.type == 'keyup' ? 0 : 1;
		}
	}
	if (!localStorage.device_id) {
		localStorage.device_id = new Date().getTime();
	}
</script>

<!-- svelte-ignore a11y-autofocus -->
<div
	class="relative flex flex-col flex-grow"
	tabindex="-1"
	autofocus
	on:keydown={handleKeyUpDown}
	on:keyup={handleKeyUpDown}
>
	<div bind:this={canvas} class="flex flex-col grow">
		<div
			class="relative flex overflow-hidden m-auto"
			style="
				width: {map_size?.w * scale}px; 
				height: {map_size?.h * scale}px;
				font-size: {(1 / scale) * 20}px;
			"
		>
			<div style="scale:{scale}" class="absolute bg-green text-md">
				{#each game.tiles as rect}
					<Rect
						shape={Object.assign(
							{
								color: getRectColor(rect),
							},
							rect,
						)}
					/>
				{/each}
				{#if game.pl.start && game.level.challenge}
					<Text
						shape={{
							x: game.level.pl.x,
							y: game.level.pl.y,
							align: 'center',
							color: 'white',
							w: 50,
							text:
								(((game.pl.end ?? new Date().getTime()) - game.pl.start) / 1000).toFixed(2) + 's',
						}}
					/>
				{/if}
				<Circle
					shape={Object.assign(
						{
							color: {
								idle: '#ff0',
								alive: '#0f0',
								dead: '#f00',
								victory: '#fff',
							}[game.pl.status],
						},
						game.pl,
					)}
				/>
			</div>
		</div>
	</div>
	<div class="h-18 py-3 flex flex-col items-center">
		{#if ['alive', 'idle'].includes(game.pl.status)}
			<div class="buttons flex scroll flex-row gap-1 items-center">
				<button
					class="text-3xl w-18 px-0 shrink"
					on:mousedown={() => (game.pl.movex = +1)}
					on:touchstart={() => (game.pl.movex = +1)}
					on:mouseup={() => game.pl.movex == +1 && (game.pl.movex = 0)}
					on:touchend={() => game.pl.movex == +1 && (game.pl.movex = 0)}
				>
					→
				</button>
				<button
					class="text-3xl w-18 px-0 shrink"
					on:mousedown={() => (game.pl.movex = -1)}
					on:touchstart={() => (game.pl.movex = -1)}
					on:mouseup={() => game.pl.movex == -1 && (game.pl.movex = 0)}
					on:touchend={() => game.pl.movex == -1 && (game.pl.movex = 0)}
				>
					←
				</button>
				{#if game.level.challenge}
					<div
						class="text-3xl px-0 shrink mx-2"
						on:mousedown={() => showHallOfFame(game.level.key)}
					>
						🏆
					</div>
				{/if}
				<button
					class="text-3xl w-18 px-0 shrink"
					on:mousedown={() => (game.pl.movey = +1)}
					on:touchstart={() => (game.pl.movey = +1)}
					on:mouseup={() => game.pl.movey == +1 && (game.pl.movey = 0)}
					on:touchend={() => game.pl.movey == +1 && (game.pl.movey = 0)}
				>
					↑
				</button>
				<button
					class="text-3xl w-18 px-0 shrink"
					on:mousedown={() => (game.pl.movey = -1)}
					on:touchstart={() => (game.pl.movey = -1)}
					on:mouseup={() => game.pl.movey == -1 && (game.pl.movey = 0)}
					on:touchend={() => game.pl.movey == -1 && (game.pl.movey = 0)}
				>
					↓
				</button>
			</div>
		{/if}
	</div>
</div>
