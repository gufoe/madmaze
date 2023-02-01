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

export const MAPS = {
  DEFAULT: [
    { x: 0, y: 0, w: 375, h: 10 },
    { x: 0, y: 667 - 10, w: 375, h: 10 },
    { x: 0, y: 0, w: 10, h: 667 },
    { x: 375 - 10, y: 0, w: 10, h: 667 },

    { x: 80, y: 10, w: 10, h: 18 },
    { x: 220, y: 10, w: 10, h: 18 },
    { x: 150, y: 62, w: 10, h: 20 },
    { x: 300, y: 10, w: 10, h: 10 },
    { x: 300, y: 70, w: 10, h: 15 },
    { x: 70, y: 80, w: 3000, h: 10 },
    { x: 0, y: 130, w: 30, h: 10 },
    { x: 70, y: 180, w: 30, h: 10 },
    { x: 80, y: 90, w: 10, h: 100 },
    { x: 146, y: 137, w: 120, h: 30 },
    { x: 0, y: 240, w: 300, h: 10 },
    { x: 100, y: 300, w: 100, h: 10 },
    { x: 300, y: 150, w: 10, h: 200 },
    { x: 200, y: 300, w: 10, h: 60 },
    { x: 100, y: 400, w: 4000, h: 10 },
    { x: 100, y: 400, w: 10, h: 100 },
    { x: 170, y: 480, w: 10, h: 20 },
    { x: 250, y: 400, w: 10, h: 40 },
    { x: 100, y: 500, w: 160, h: 10 },
    { x: 100, y: 500, w: 160, h: 10 },

    { x: 350, y: 20, w: 50, h: 50, victory: true },
  ],
};

const def_pl = (): Player => ({
  x: 140,
  y: 470,
  r: 20,
  movex: 0,
  movey: 0,
  status: "idle",
});
export class Game {
  constructor(public squares: GameRect[]) {}

  pl: Player = def_pl();

  initGame() {
    Object.assign(this.pl, def_pl());
  }

  // export  setup() {
  //   createCanvas(window.innerWidth, 667);
  //   frameRate(30);
  //   initGame();
  // }

  update(): this {
    if (this.pl.status == "idle" && (this.pl.movex || this.pl.movey)) {
      this.pl.status = "alive";
      this.pl.start = new Date().getTime();
    }
    if (this.pl.status == "alive") {
      this.pl.x += this.pl.movex * 4;
      this.pl.y -= this.pl.movey * 4;
    }
    const int = this.getCollisions();
    if (int.find((x) => x.victory)) {
      this.pl.status = "victory";
    } else if (int.find((x) => !x.victory)) {
      this.pl.status = "dead";
    }
    // if (mouseX) {
    //     this.pl.x = mouseX
    //     this.pl.y = mouseY
    // }

    // if (this.pl.ready) {
    //   text(
    //     (((this.pl.end ?? (new Date).getTime()) - this.pl.start) / 1000).toFixed(2) + "s",
    //     125,
    //     485
    //   );
    // }
    return this;
  }

  getCollisions() {
    return this.squares.filter((s) => intersects(this.pl, s));
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
