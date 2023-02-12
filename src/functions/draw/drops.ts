import { drawImage } from "./utils";

const DROP_SIZE = 15;

const getDropImage = (type: DropType, images: Images) => {
  const image = {
    choco0: images.choco0,
    choco1: images.choco1,
    choco2: images.choco2,
    hone: images.hone,
  };
  return image[type];
};

export const drawDrops = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  images: Images,
  drops: Drop[]
) => {
  drops.forEach((drop: Drop) => {
    if (drop.ms < 0) return;
    const image = getDropImage(drop.type, images);
    const DROP_HEIGHT_RATIO = images.choco0.height / images.choco0.width;
    const x = drop.x - DROP_SIZE / 2;
    const y = drop.y - DROP_SIZE;
    const w = DROP_SIZE;
    const h = DROP_SIZE * DROP_HEIGHT_RATIO;
    drawImage(ctx, image, x, y, w, h, canvasSize);
  });
};

export const drawDemoDrops = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  images: Images
) => {
  const DEMO_DROP_SIZE = DROP_SIZE * 1.1;
  const image0 = getDropImage("choco0", images);
  const x0 = 10 - DEMO_DROP_SIZE / 2;
  const y0 = 20 - DEMO_DROP_SIZE;
  const image1 = getDropImage("choco1", images);
  const x1 = 90 - DEMO_DROP_SIZE / 2;
  const y1 = 20 - DEMO_DROP_SIZE;
  const image2 = getDropImage("choco2", images);
  const x2 = 90 - DEMO_DROP_SIZE / 2;
  const y2 = 45 - DEMO_DROP_SIZE;
  const image3 = getDropImage("hone", images);
  const x3 = 10 - DEMO_DROP_SIZE / 2;
  const y3 = 45 - DEMO_DROP_SIZE;
  const DROP_HEIGHT_RATIO = images.choco0.height / images.choco0.width;
  const w = DEMO_DROP_SIZE;
  const h = DEMO_DROP_SIZE * DROP_HEIGHT_RATIO;
  drawImage(ctx, image0, x0, y0, w, h, canvasSize);
  drawImage(ctx, image1, x1, y1, w, h, canvasSize);
  drawImage(ctx, image2, x2, y2, w, h, canvasSize);
  drawImage(ctx, image3, x3, y3, w, h, canvasSize);

  const text = "DANGER!!";
  const xt = 0;
  const yt = 90;
  const dx = Math.round((canvasSize.width / 100) * xt);
  const dy = Math.round((canvasSize.height / 100) * yt);
  ctx.fillStyle = "red";
  ctx.font = "26px sans-serif";
  ctx.fillText(text, dx, dy);
};
