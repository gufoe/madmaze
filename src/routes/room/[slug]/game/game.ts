import { cloneDeep } from 'lodash';

export interface CanDraw {
	color?: string;
}
export interface Point {
	x: number;
	y: number;
	text?: string;
	align?: string;
}
export interface Rect extends Point, CanDraw {
	w: number;
	h: number;
}
export interface Circle extends Point, CanDraw {
	r: number;
}
export interface Text extends Point, CanDraw {
	w: number;
}
export type Player = {
	x: number;
	y: number;
	vx?: number;
	vy?: number;
	acc?: number;
	friction?: number;
	r: number;
	movex: number;
	movey: number;
	speed: number;
	start?: number;
	status: 'idle' | 'alive' | 'dead' | 'victory';
	end?: number;
	hit?: GameRect;
};
export type LevelName = string;

export interface GameRectBase extends Rect {
	text?: string;
	on_tick?: (tick: number, rect: GameRect) => void;
}
export interface VictoryTile extends GameRectBase {
	type: 'victory';
	goto?: LevelName;
}
export interface CheckpointTile extends GameRectBase {
	type: 'checkpoint';
	touched?: boolean;
}
export interface KillerTile extends GameRectBase {
	type: 'killer';
}
export type GameRect = VictoryTile | CheckpointTile | KillerTile;

export interface GameMap {
	key: string;
	challenge?: boolean;
	pl: Player;
	tiles: GameRect[];
	on_tick?: (tick: number, tiles: GameRect[]) => GameRect[];
}

export class Game {
	tick!: number;
	pl!: Player;
	tiles!: GameRect[];
	level!: GameMap;

	constructor(level: GameMap) {
		this.initGame(level);
	}

	initGame(level?: GameMap) {
		if (level) this.level = level;
		this.pl = Object.assign({}, this.level.pl);
		this.tiles = cloneDeep(this.level.tiles);
		this.tick = 0;
	}

	update(): this {
		if (this.pl.status == 'idle' && (this.pl.movex || this.pl.movey)) {
			this.pl.status = 'alive';
			this.pl.start = new Date().getTime();
		}

		if (this.pl.status != 'alive') {
			return this;
		}

		this.tick++;

		if (this.level.on_tick) {
			this.tiles = this.level.on_tick(this.tick, this.tiles);
		}
		this.tiles.forEach((t) => t.on_tick && t.on_tick(this.tick, t));
		if (this.pl.acc) {
			if (!this.pl.vx) this.pl.vx = 0;
			if (!this.pl.vy) this.pl.vy = 0;

			this.pl.vx += this.pl.movex * this.pl.acc;
			this.pl.vy -= this.pl.movey * this.pl.acc;

			this.pl.x += this.pl.vx;
			this.pl.y += this.pl.vy;

			this.pl.vx *= 1 - (this.pl.friction ?? 0.05);
			this.pl.vy *= 1 - (this.pl.friction ?? 0.05);
		} else {
			this.pl.x += this.pl.movex * this.pl.speed;
			this.pl.y -= this.pl.movey * this.pl.speed;
		}

		const int = this.getCollisions();
		if (int.find((x) => x.type == 'victory')) {
			if (!this.tiles.find((x) => x.type == 'checkpoint' && !x.touched)) {
				this.pl.status = 'victory';
				this.pl.hit = int.find((x) => x.type == 'victory');
				this.pl.end = new Date().getTime();
			}
		} else if (int.find((x) => x.type == 'killer')) {
			this.pl.status = 'dead';
			this.pl.end = new Date().getTime();
		} else if (int.find((x) => x.type == 'checkpoint' && !x.touched)) {
			const checkpoint = int.find((x) => x.type == 'checkpoint' && !x.touched) as CheckpointTile;
			checkpoint.touched = true;
		} else {
			let out = false;
			if (this.pl.x - this.pl.r < 0) out = true;
			if (this.pl.y - this.pl.r < 0) out = true;
			const bb = boundingBox(this.tiles);
			if (this.pl.x + this.pl.r > bb.w) out = true;
			if (this.pl.y + this.pl.r > bb.h) out = true;
			if (out) {
				this.pl.status = 'dead';
				this.pl.end = new Date().getTime();
			}
		}

		return this;
	}

	getCollisions() {
		return this.tiles.filter((s) => intersects(this.pl, s));
	}
}

function intersects(circle: Circle, rect: Rect) {
	const distX = Math.abs(circle.x - rect.x - rect.w / 2);
	const distY = Math.abs(circle.y - rect.y - rect.h / 2);

	if (distX > rect.w / 2 + circle.r) {
		return false;
	}
	if (distY > rect.h / 2 + circle.r) {
		return false;
	}

	if (distX <= rect.w / 2) {
		return true;
	}
	if (distY <= rect.h / 2) {
		return true;
	}

	const dx = distX - rect.w / 2;
	const dy = distY - rect.h / 2;
	return dx * dx + dy * dy <= circle.r * circle.r;
}

export function getRatio(fit: { w: number; h: number }, squares: GameRect[]) {
	const bb = boundingBox(squares);
	return Math.min(fit.w / bb.w, fit.h / bb.h);
}
export function scaleMapToFit(fit: { w: number; h: number }, squares: GameRect[]) {
	const ratio = getRatio(fit, squares);
	return squares.map(
		(s): GameRect =>
			Object.assign(cloneDeep(s), {
				x: s.x * ratio,
				y: s.y * ratio,
				w: s.w * ratio,
				h: s.h * ratio,
			}),
	);
}
export function boundingBox(squares: GameRect[]) {
	return {
		w: squares.reduce((max, s) => Math.max(max, s.x + s.w), 0),
		h: squares.reduce((max, s) => Math.max(max, s.y + s.h), 0),
	};
}

const FRASI_SCARSE = [
	{ m: 'Che scarso!', f: 'Che scarsa!', x: 'Che scarsƏ!' },
	{ m: '...', f: '...', x: '...' },
	{ m: 'Mamma mia...', f: 'Mamma mia...', x: 'Mamma mia...' },
	{ m: 'Troppo veloce fra', f: 'Non confondere la sinistra con la destra', x: 'ƏƏƏƏƏƏƏƏ' },
	{ m: 'Troppo lento fra', f: 'Hai le unghie troppo lunghe', x: 'TagliatƏ lƏ unghiƏ' },
	{
		m: 'Ma fatti una pasta',
		f: 'Le suore sono più brave di te a questo gioco',
		x: 'TagliatƏ lƏ unghiƏ',
	},
	{ m: 'Vatti a vedere una partita che è meglio', f: 'Donna', x: 'Sei un Neanderthal' },
];
export function fraseScarsa(genere: 'm' | 'f' | 'x') {
	const i = Math.floor(Math.random() * FRASI_SCARSE.length);
	return FRASI_SCARSE[i][genere];
}
