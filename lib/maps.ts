import type { GameMap, Player } from "./game";

export const MAPS: { [key: string]: GameMap } = {
  "level/test": genmap(),
  "level/2": {
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
      // { x: 0, y: 667 - 10, w: 375, h: 10 },
      // { x: 0, y: 0, w: 10, h: 667 },
      // { x: 375 - 10, y: 0, w: 10, h: 667 },

      // { x: 80, y: 10, w: 10, h: 18 },
      // { x: 220, y: 10, w: 10, h: 18 },
      // { x: 150, y: 62, w: 10, h: 20 },
      // { x: 300, y: 10, w: 10, h: 10 },
      // { x: 300, y: 70, w: 10, h: 15 },
      // { x: 70, y: 80, w: 300, h: 10 },
      // { x: 0, y: 130, w: 30, h: 10 },
      // { x: 70, y: 180, w: 30, h: 10 },
      // { x: 80, y: 90, w: 10, h: 100 },
      // { x: 146, y: 137, w: 120, h: 30 },
      // { x: 0, y: 240, w: 300, h: 10 },
      // { x: 100, y: 300, w: 100, h: 10 },
      // { x: 300, y: 150, w: 10, h: 200 },
      // { x: 200, y: 300, w: 10, h: 60 },
      // { x: 100, y: 400, w: 270, h: 10 },
      // { x: 100, y: 400, w: 10, h: 100 },
      // { x: 170, y: 480, w: 10, h: 20 },
      // { x: 250, y: 400, w: 10, h: 40 },
      // { x: 100, y: 500, w: 160, h: 10 },
      // { x: 100, y: 500, w: 160, h: 10 },

      // { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
  "level/3": {
    pl: {
      x: 30,
      y: 27.5,
      r: 12,
      movex: 0,
      movey: 0,
      status: "idle",
      speed: 1,
    },
    tiles: [
      { x: 0, y: 0, w: 100, h: 10 },
      { x: 0, y: 150 - 10, w: 100, h: 10 },
      { x: 0, y: 0, w: 10, h: 100 },
      { x: 100 - 10, y: 0, w: 10, h: 100 },

      { x: 0, y: 0, w: 100, h: 10 },
      { x: 0, y: 90, w: 100, h: 10 },
      { x: 50, y: 45, w: 50, h: 10 },
      { x: 80, y: 60, w: 20, h: 20, victory: true },
      // { x: 0, y: 667 - 10, w: 375, h: 10 },
      // { x: 0, y: 0, w: 10, h: 667 },
      // { x: 375 - 10, y: 0, w: 10, h: 667 },

      // { x: 80, y: 10, w: 10, h: 18 },
      // { x: 220, y: 10, w: 10, h: 18 },
      // { x: 150, y: 62, w: 10, h: 20 },
      // { x: 300, y: 10, w: 10, h: 10 },
      // { x: 300, y: 70, w: 10, h: 15 },
      // { x: 70, y: 80, w: 300, h: 10 },
      // { x: 0, y: 130, w: 30, h: 10 },
      // { x: 70, y: 180, w: 30, h: 10 },
      // { x: 80, y: 90, w: 10, h: 100 },
      // { x: 146, y: 137, w: 120, h: 30 },
      // { x: 0, y: 240, w: 300, h: 10 },
      // { x: 100, y: 300, w: 100, h: 10 },
      // { x: 300, y: 150, w: 10, h: 200 },
      // { x: 200, y: 300, w: 10, h: 60 },
      // { x: 100, y: 400, w: 270, h: 10 },
      // { x: 100, y: 400, w: 10, h: 100 },
      // { x: 170, y: 480, w: 10, h: 20 },
      // { x: 250, y: 400, w: 10, h: 40 },
      // { x: 100, y: 500, w: 160, h: 10 },
      // { x: 100, y: 500, w: 160, h: 10 },

      // { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
  DEFAULT: {
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
      { x: 100, y: 500, w: 160, h: 10 },

      { x: 350, y: 20, w: 50, h: 50, victory: true },
    ],
  },
};

function genmap(): GameMap {
  const mheight = 100;
  const mwidth = 100;
  let rectu = 1;

  let unit = 22;

  const min_player_factor = 0.38 * 0.5; // r = d/2
  const player_radius = unit * min_player_factor;

  const pl: Player = {
    x: player_radius * 2,
    y: mheight - player_radius,
    r: player_radius,
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
  ];
  return {
    pl: pl,
    tiles: tiles,
  };
}
