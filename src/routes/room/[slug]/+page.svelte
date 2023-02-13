<script lang="ts">
	import { Engine } from './game/engine';
	import GameCanvas from './GameCanvas.svelte';
	const engine = new Engine();
	import { page } from '$app/stores';
	$page.route;
	$: game = engine.goToLevel($page.params.slug);
</script>

<div class="flex flex-col flex-grow bg-black">
	{#if engine.game}
		{#key $page.params.slug}
			<GameCanvas game={engine.game} />
		{/key}
	{/if}
</div>
