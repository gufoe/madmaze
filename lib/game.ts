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
  start?: number;
  status: "idle" | "alive" | "dead" | "victory";
  end?: number;
};

export interface GameRect extends Rect {
  victory?: boolean;
}

export interface GameMap {
  pl: Player;
  tiles: GameRect[];
}

export const MAPS: { [key: string]: GameMap } = {
  DEFAULT: {
    pl: {
      x: 140,
      y: 470,
      r: 20,
      movex: 0,
      movey: 0,
      status: "idle",
    },
    tiles: [
      { x: 0, y: 0, w: 375, h: 10 },
      { x: 0, y: 667 - 10, w: 375, h: 10 },
      { x: 0, y: 0, w: 10, h: 667 },
      { x: 375 - 10, y: 0, w: 10, h: 667 },

      { x: 80, y: 10, w: 10, h: 18 },
      { x: 220, y: 10, w: 10, h: 18 },
      { x: 150, y: 62, w: 10, h: 20 },
      { x: 300, y: 10, w: 10, h: 10 },
      { x: 300, y: 70, w: 10, h: 15 },
      { x: 70, y: 80, w: 300, h: 10 },
      { x: 0, y: 130, w: 30, h: 10 },
      { x: 70, y: 180, w: 30, h: 10 },
      { x: 80, y: 90, w: 10, h: 100 },
      { x: 146, y: 137, w: 120, h: 30 },
      { x: 0, y: 240, w: 300, h: 10 },
      { x: 100, y: 300, w: 100, h: 10 },
      { x: 300, y: 150, w: 10, h: 200 },
      { x: 200, y: 300, w: 10, h: 60 },
      { x: 100, y: 400, w: 270, h: 10 },
      { x: 100, y: 400, w: 10, h: 100 },
      { x: 170, y: 480, w: 10, h: 20 },
      { x: 250, y: 400, w: 10, h: 40 },
      { x: 100, y: 500, w: 160, h: 10 },
      { x: 100, y: 500, w: 160, h: 10 },

      { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
};

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

export class Game {
  pl: Player;
  constructor(public map: GameMap) {
    this.initGame();
  }

  initGame() {
    this.pl = Object.assign({}, this.map.pl);
  }

  update(): this {
    if (this.pl.status == "idle" && (this.pl.movex || this.pl.movey)) {
      this.pl.status = "alive";
      this.pl.start = new Date().getTime();
    }
    if (this.pl.status == "alive") {
      this.pl.x += this.pl.movex * 4;
      this.pl.y -= this.pl.movey * 4;
      const int = this.getCollisions();
      if (int.find((x) => x.victory)) {
        this.pl.status = "victory";
        this.pl.end = new Date().getTime();
      } else if (int.find((x) => !x.victory)) {
        this.pl.status = "dead";
        this.pl.end = new Date().getTime();
      }
    }
    return this;
  }

  getCollisions() {
    return this.map.tiles.filter((s) => intersects(this.pl, s));
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
