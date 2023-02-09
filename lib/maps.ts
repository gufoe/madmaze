import type { GameMap, GameRect, Player } from "./game";

// Inkscape regex:
// replace: <rect([^>]|\n)*width="([^"]+)"([^>]|\n)*height="([^"]+)"([^>]|\n)*x="([^"]+)"([^>]|\n)*y="([^"]+)"(\s|\n)*/>
// with: {w:$2,h:$4,x:$6,y:$8},
export const MAPS: { [key: string]: GameMap } = {
  "level/test": genmap(),
  "level/2": {
    key: "level/2",
    pl: {
      x: 70,
      y: 27.5,
      r: 12,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 1,
    },
    tiles: [
      { x: 0, y: 0, w: 100, h: 10 },
      { x: 0, y: 100 - 10, w: 100, h: 10 },
      { x: 0, y: 0, w: 10, h: 100 },
      { x: 100 - 10, y: 0, w: 10, h: 100 },

      { x: 0, y: 0, w: 100, h: 10 },
      { x: 0, y: 90, w: 100, h: 10 },
      { x: 50, y: 45, w: 50, h: 10 },
      { x: 80, y: 60, w: 20, h: 20, victory: true },
    ],
  },
  "level/3": {
    key: "level/3",
    pl: {
      x: 180,
      y: 30,
      r: 7,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 2,
    },
    tiles: [
      { w: 204.9641, h: 18.66279, x: 0.7495842, y: 1.0001411 },
      { w: 18.331842, h: 129.98592, x: 3.8913891, y: 16.22121 },
      { w: 56.261501, h: 12.384533, x: 140.13647, y: 45.956635 },
      { w: 26.154821, h: 13.609474, x: 91.164764, y: 16.249582 },
      { w: 47.48418, h: 13.808857, x: 57.262703, y: 45.603897 },
      { w: 53.91407, h: 21.95627, x: 95.048309, y: 54.134781 },
      { w: 16.710117, h: 79.611313, x: 18.907455, y: 58.964489 },
      { w: 23.997547, h: 74.738411, x: 67.577805, y: 57.537205 },
      { w: 116.17979, h: 30.051643, x: 73.30529, y: 130.23201 },
      { w: 39.372231, h: 36.085316, x: 4.4009933, y: 137.09041 },
      { w: 15.218632, h: 14.885399, x: 61.456318, y: 88.047188 },
      { w: 13.531085, h: 3.9544156, x: 32.377602, y: 74.694908 },
      { w: 164.75768, h: 23.183367, x: 26.416018, y: 184.29739 },
      { w: 30.714697, h: 31.723936, x: 16.156256, y: 165.95016 },
      { w: 23.423122, h: 14.001293, x: 181.11523, y: 165.97885, victory: true },
    ],
  },
  "level/4": {
    key: "level/4",
    pl: {
      x: 30,
      y: 75,
      r: 12,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 3,
    },
    tiles: [
      { x: 0, y: 0, w: 130, h: 10 },
      { x: 0, y: 130, w: 130, h: 10 },
      { x: 40, y: 50, w: 10, h: 10 },
      { x: 30, y: 100, w: 10, h: 10 },
      { x: 80, y: 50, w: 10, h: 50 },
      { x: 120, y: 55, w: 10, h: 30, victory: true },
    ],
  },
  "level/5": {
    key: "level/5",
    pl: {
      x: 14,
      y: 79,
      r: 5,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 1,
    },
    on_tick: (tick: number, tiles: GameRect[]) => {
      tiles[1].x = Math.sin(tick / 20) * 100;
      // tiles[1].w = Math.sin(tick / 10) * 100;
      tiles[1].victory = Math.round(tick / 100) % 2 == 0;
      return tiles;
    },
    tiles: [
      { w: 7, h: 161, x: 2, y: 3 },
      { w: 77, h: 6, x: 9, y: 3 },
      { w: 16, h: 16, x: 73, y: 147, victory: true },
    ],
  },
  DEFAULT: {
    key: "origin",
    pl: {
      x: 140,
      y: 470,
      r: 20,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 4,
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

      { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
  DEFAULT2: {
    key: "origin2",
    pl: {
      x: 140,
      y: 370,
      // y: 470,
      r: 20,
      vx: 0,
      vy: 0,
      acc: 1.3,
      friction: 0.3,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 4,
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
      {
        x: 70,
        y: 180,
        w: 30,
        h: 10,
        on_tick(tick, tile) {
          tile.x = 70 + Math.sin(tick / 14) * 10;
        },
      },
      { x: 80, y: 90, w: 10, h: 100 },
      // Big square
      {
        x: 146,
        y: 147,
        w: 120,
        h: 30,
        on_tick(tick, tile) {
          tile.y = 147 + Math.sin(10 + tick / 16) * 30;
        },
      },
      { x: 0, y: 240, w: 300, h: 10 },
      { x: 100, y: 300, w: 200, h: 10 },
      { x: 300, y: 150, w: 10, h: 200 },
      {
        x: 200,
        y: 350,
        w: 10,
        h: 10,
        checkpoint: true,
      },
      {
        x: 200,
        y: 270,
        w: 10,
        h: 10,
        checkpoint: true,
      },
      {
        x: 200,
        y: 275,
        w: 10,
        h: 100,
        on_tick(tick, tile) {
          tile.y = 275 + Math.sin(tick / 8) * 80;
        },
      },
      { x: 100, y: 400, w: 270, h: 10 },
      { x: 100, y: 400, w: 10, h: 100 },
      { x: 170, y: 480, w: 10, h: 20 },
      { x: 250, y: 400, w: 10, h: 40 },
      { x: 100, y: 500, w: 160, h: 10 },

      { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
};

function genmap(): GameMap {
  const mheight = 1000;
  const mwidth = 1000;
  let rectu = 15;

  let unit = 200;

  const min_player_factor = 0.38 * 0.5; // r = d/2
  const player_radius = unit * min_player_factor;

  const pl: Player = {
    x: player_radius * 2,
    y: mheight - player_radius,
    r: player_radius,
    vx: 0,
    vy: 0,
    acc: 3,
    movex: 0,
    movey: 0,
    status: "idle",
    speed: 1,
  };

  const tiles = [
    { x: 0, y: 0, w: mwidth, h: rectu },
    { x: unit, y: unit, w: mwidth - 1 * unit, h: rectu },
    { x: 0, y: 2 * unit, w: mwidth - 1 * unit, h: rectu },
    { x: unit, y: 3 * unit, w: mwidth - 1 * unit, h: rectu },
    { x: 0, y: 4 * unit, w: mwidth - 1 * unit, h: rectu },

    { x: mwidth - rectu, y: 0, w: rectu, h: mheight },
    { x: 0, y: 0, w: rectu, h: mheight },
    { x: 0, y: 0, w: rectu, h: mheight },
    {
      x: mwidth - player_radius,
      y: mheight - player_radius,
      w: rectu * 4,
      h: rectu * 4,
      victory: true,
    },
    {
      x: mwidth / 2,
      y: mheight / 2,
      w: rectu * 4,
      h: rectu * 4,
      checkpoint: true,
      touched: false,
    },
    {
      x: mwidth / 2,
      y: player_radius,
      w: rectu * 4,
      h: rectu * 4,
      checkpoint: true,
      touched: false,
    },
  ];
  return {
    pl: pl,
    tiles: tiles,
    key: "Test-Checkpoint",
  };
}
