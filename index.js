let moveUp = false;
let moveDown = false;
let moveRight = false;
let moveLeft = false;
let frame = 0;
let oscar = loadCharacter("oscar", 0, 0);
let dani = loadCharacter("dani", 6, 6);

function drawLoop(canvas, ctx) {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveCharacter(oscar, moveRight, moveLeft, moveUp, moveDown);
  drawCharacter(ctx, oscar, frame);
  moveCharacter(dani, moveRight, moveLeft, moveUp, moveDown);
  drawCharacter(ctx, dani, frame);
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

function main() {
  document.addEventListener("keydown", (e) => moveHandler(true, e), false);
  document.addEventListener("keyup", (e) => moveHandler(false, e), false);
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "green";
  ctx.imageSmoothingEnabled = false;
  ctx.scale(2, 2);

  setInterval(() => drawLoop(canvas, ctx), 10);
}

$(document).ready(main);
