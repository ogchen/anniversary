let moveUp = false;
let moveDown = false;
let moveRight = false;
let moveLeft = false;
let frame = 0;
let tmpx = 8;
let tmpy = 8;
let oscar = loadCharacter("oscar", tmpx * 64, tmpy * 64, 0, 0);
let dani = loadCharacter("dani", tmpx * 64, tmpy * 64, 16, 16);

function drawBackground(ctx) {
  drawMap(ctx);
  drawBoat(ctx);
}

function drawLoop(canvas, ctx) {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  let x = Math.max(
    -1 * map.rows * 64 + canvas.width,
    Math.min(0, canvas.width / 2 - dani.x)
  );
  let y = Math.max(
    -1 * map.cols * 64 + canvas.height,
    Math.min(0, canvas.height / 2 - dani.y)
  );

  ctx.translate(x, y);
  drawBackground(ctx);

  moveCharacter(oscar, moveRight, moveLeft, moveUp, moveDown);
  drawCharacter(ctx, oscar, frame);
  moveCharacter(dani, moveRight, moveLeft, moveUp, moveDown);
  drawCharacter(ctx, dani, frame);
  ctx.restore();
}

function moveHandler(set, e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    moveRight = set;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    moveLeft = set;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    moveUp = set;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    moveDown = set;
  }
}

function createAudio(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
}

function main() {
  document.addEventListener("keydown", (e) => moveHandler(true, e), false);
  document.addEventListener("keyup", (e) => moveHandler(false, e), false);
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = 800;
  ctx.canvas.height = 600;

  ctx.fillStyle = "green";
  ctx.imageSmoothingEnabled = false;

  const audio = new createAudio("assets/audio.mp3");
  audio.play();

  setInterval(() => drawLoop(canvas, ctx), 10);
}

$(document).ready(function () {
  $("#start").click(() => {
    $("#start").remove();
    main();
  });
});
