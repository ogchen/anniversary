let map = {
  cols: 16,
  rows: 16,
  // prettier-ignore
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 22, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 21, 16, 12, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 20, 17, 13, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 19, 18, 14, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 11, 9, 6, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 10, 8, 7, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  getTile: (row, col) => {
    return map.tiles[row * map.cols + col];
  },
};

let tileLookup = [
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];
let tileSrc = [
  "grass",
  "deck0",
  "deck1",
  "deck2",
  "step1",
  "step2",
  "hut1",
  "hut2",
  "hut3",
  "hut4",
  "hut5",
  "hut6",
  "house1",
  "house2",
  "house3",
  "house4",
  "house5",
  "house6",
  "house7",
  "house8",
  "house9",
  "house10",
  "house11",
];
let tileAtlas = [];
tileSrc.forEach((src) => {
  let img = new Image();
  img.src = `assets/${src}.png`;
  tileAtlas.push(img);
});

function isSolid(x, y) {
  x = Math.floor(x / 64);
  y = Math.floor(y / 64);
  if (x < map.rows && y < map.cols && x >= 0 && y >= 0) {
    return tileLookup[map.getTile(x, y)];
  }
  return true;
}

function loadMap() {
  let img = new Image();
}

function drawMap(ctx) {
  for (let row = 0; row < map.rows; ++row) {
    for (let col = 0; col < map.cols; ++col) {
      const tile = map.getTile(row, col);
      let x = row * 64;
      let y = col * 64;
      ctx.drawImage(tileAtlas[0], x, y, 64, 64);
      ctx.drawImage(tileAtlas[tile], x, y, 64, 64);
    }
  }
}

let boat = new Image();
boat.src = "assets/boat.png";

function drawBoat(ctx) {
  ctx.drawImage(boat, 5 * 64, 5 * 64, 4 * 64, 9 * 64);
}
