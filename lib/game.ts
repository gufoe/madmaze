import { cloneDeep } from "lodash";

export interface CanDraw {
  color?: string;
}
export interface Point {
  x: number;
  y: number;
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
  align: string;
  text: string;
}
export type Player = {
  x: number;
  y: number;
  r: number;
  movex: number;
  movey: number;
  speed: number;
  start?: number;
  status: "idle" | "alive" | "dead" | "victory";
  end?: number;
};

export interface GameRect extends Rect {
  victory?: boolean;
  checkpoint?: boolean;
  touched?: boolean;
}

export interface GameMap {
  key: string;
  pl: Player;
  tiles: GameRect[];
}

export class Game {
  pl: Player;
  tiles: GameRect[];
  constructor(public level: GameMap) {
    this.initGame();
  }

  initGame() {
    this.pl = Object.assign({}, this.level.pl);
    this.tiles = cloneDeep(this.level.tiles);
  }

  update(): this {
    if (this.pl.status == "idle" && (this.pl.movex || this.pl.movey)) {
      this.pl.status = "alive";
      this.pl.start = new Date().getTime();
    }
    if (this.pl.status == "alive") {
      this.pl.x += this.pl.movex * this.pl.speed;
      this.pl.y -= this.pl.movey * this.pl.speed;
      const int = this.getCollisions();
      if (int.find((x) => x.victory)) {
        if (!this.tiles.find((x) => x.checkpoint && !x.touched)) {
          this.pl.status = "victory";
          this.pl.end = new Date().getTime();
        } else {
          console.log("tocca tutti i checkpoint prima di continuare");
        }
      } else if (int.find((x) => x.checkpoint)) {
        let checkpoint = int.find((x) => x.checkpoint);
        checkpoint.touched = true;
      } else if (int.find((x) => !x.victory)) {
        this.pl.status = "dead";
        this.pl.end = new Date().getTime();
      } else {
        let out = false;
        if (this.pl.x - this.pl.r < 0) out = true;
        if (this.pl.y - this.pl.r < 0) out = true;
        const bb = boundingBox(this.tiles);
        if (this.pl.x + this.pl.r > bb.w) out = true;
        if (this.pl.y + this.pl.r > bb.h) out = true;
        if (out) {
          this.pl.status = "dead";
          this.pl.end = new Date().getTime();
        }
      }
    }
    return this;
  }

  getCollisions() {
    return this.tiles.filter((s) => intersects(this.pl, s));
  }
}

function intersects(circle: Circle, rect: Rect) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

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

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
}

export function getRatio(fit: { w: number; h: number }, squares: GameRect[]) {
  const bb = boundingBox(squares);
  return Math.min(fit.w / bb.w, fit.h / bb.h);
}
export function scaleMapToFit(
  fit: { w: number; h: number },
  squares: GameRect[]
) {
  const ratio = getRatio(fit, squares);
  return squares.map((s) => ({
    x: s.x * ratio,
    y: s.y * ratio,
    w: s.w * ratio,
    h: s.h * ratio,
    victory: s.victory,
  }));
}
export function boundingBox(squares: GameRect[]) {
  return {
    w: squares.reduce((max, s) => Math.max(max, s.x + s.w), 0),
    h: squares.reduce((max, s) => Math.max(max, s.y + s.h), 0),
  };
}
