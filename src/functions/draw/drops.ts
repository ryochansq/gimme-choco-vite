import { drawImage } from "./utils";

const DROP_SIZE = 15;
const choco0Image = new Image();
choco0Image.onload = () => {
  hasLoaded[0] = true;
  console.info("onload");
};
choco0Image.src = "/drops/choco0.png";
const choco1Image = new Image();
choco1Image.onload = () => (hasLoaded[1] = true);
choco1Image.src = "/drops/choco1.png";
const choco2Image = new Image();
choco2Image.onload = () => (hasLoaded[2] = true);
choco2Image.src = "/drops/choco2.png";
const honeImage = new Image();
honeImage.onload = () => (hasLoaded[3] = true);
honeImage.src = "/drops/hone.png";

const hasLoaded = new Array<boolean>(4).fill(false);
export const hasDropsLoaded = () => hasLoaded.every((val) => val);

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

export const drawDemoDrops = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size
) => {
  const DEMO_DROP_SIZE = DROP_SIZE * 1.1;
  const image0 = getDropImage("choco0");
  const x0 = 10 - DEMO_DROP_SIZE / 2;
  const y0 = 20 - DEMO_DROP_SIZE;
  const image1 = getDropImage("choco1");
  const x1 = 90 - DEMO_DROP_SIZE / 2;
  const y1 = 20 - DEMO_DROP_SIZE;
  const image2 = getDropImage("choco2");
  const x2 = 90 - DEMO_DROP_SIZE / 2;
  const y2 = 45 - DEMO_DROP_SIZE;
  const image3 = getDropImage("hone");
  const x3 = 10 - DEMO_DROP_SIZE / 2;
  const y3 = 45 - DEMO_DROP_SIZE;
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
