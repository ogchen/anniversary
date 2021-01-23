let ANIMATION_INTERVAL = 18;

function loadCharacterSprite(name) {
  result = {};

  const directions = ["left", "right", "up", "down"];
  directions.forEach((dir) => {
    result[dir] = [];
    const sequence = [1, 2, 3];
    sequence.forEach((seq) => {
      let image = new Image();
      image.src = `assets/${name}-${dir}-${seq}.png`;
      result[dir].push(image);
    });
  });

  return result;
}

function loadCharacter(name, x, y, offsetx, offsety) {
  return {
    sprite: loadCharacterSprite(name),
    direction: "down",
    isMoving: false,
    x,
    y,
    offsetx,
    offsety,
  };
}

function drawCharacter(ctx, character, frame) {
  const spriteSequence = character.sprite[character.direction];
  let spriteNum = 1;
  if (character.isMoving) {
    const tmp = Math.floor(frame / ANIMATION_INTERVAL) % 4;
    spriteNum = tmp == 1 ? 0 : tmp == 3 ? 2 : spriteNum;
  }
  ctx.drawImage(
    spriteSequence[spriteNum],
    character.x + character.offsetx,
    character.y + character.offsety,
    64,
    64
  );
}

function moveCharacter(character, moveRight, moveLeft, moveUp, moveDown) {
  let speed = 2;
  let dx = moveRight ? 1 : moveLeft ? -1 : 0;
  let dy = moveDown ? 1 : moveUp ? -1 : 0;
  character.direction =
    dx > 0
      ? "right"
      : dx < 0
      ? "left"
      : dy > 0
      ? "down"
      : dy < 0
      ? "up"
      : character.direction;

  if (isSolid(character.x + 32 + dx * 64, character.y)) {
    dx = 0;
  }
  if (
    (dy < 0 && isSolid(character.x, character.y + dy)) ||
    (dy > 0 && isSolid(character.x, character.y + dy + 64))
  ) {
    dy = 0;
  }
  dx *= speed;
  dy *= speed;

  character.x += dx;
  character.y += dy;
  character.isMoving = dx != 0 || dy != 0;
}
