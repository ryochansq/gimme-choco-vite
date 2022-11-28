import { drawImage } from "./utils";

const DROP_SIZE = 15;
const choco0Image = new Image();
choco0Image.src = "/drops/choco0.png";
const choco1Image = new Image();
choco1Image.src = "/drops/choco1.png";
const choco2Image = new Image();
choco2Image.src = "/drops/choco2.png";
const honeImage = new Image();
honeImage.src = "/drops/hone.png";
const DROP_HEIGHT_RATIO = choco0Image.height / choco0Image.width;

const getDropImage = (type: DropType) => {
  const image = {
    choco0: choco0Image,
    choco1: choco1Image,
    choco2: choco2Image,
    hone: honeImage,
  };
  return image[type];
};

export const drawDrops = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  drops: Drop[]
) => {
  drops.forEach((drop: Drop) => {
    if (drop.ms < 0) return;
    const image = getDropImage(drop.type);
    const x = drop.x - DROP_SIZE / 2;
    const y = drop.y - DROP_SIZE;
    const w = DROP_SIZE;
    const h = DROP_SIZE * DROP_HEIGHT_RATIO;
    drawImage(ctx, image, x, y, w, h, canvasSize);
  });
};
