import { drawImage } from "./utils";

const INTERVAL = 300; // 単位：ms
const DISPLAY_TIME = 1200; // 単位：ms
const TEXT_SIZE = 100;

const getTextImage = (phase: Phase, images: Images) => {
  const image = {
    GIVEME: images.giveMe,
    CHOCOLATE: images.chocolate,
    GAME: images.finish,
    FINISH: images.finish,
    END: images.finish,
  };
  return image[phase];
};

export const drawTexts = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  images: Images,
  phase: Phase,
  ms: number
) => {
  if (!["GIVEME", "CHOCOLATE", "FINISH"].includes(phase)) return;
  if (ms < INTERVAL || INTERVAL + DISPLAY_TIME < ms) return;
  const TEXT_HEIGHT_RATIO = images.giveMe.height / images.giveMe.width;
  const image = getTextImage(phase, images);
  const w = TEXT_SIZE;
  const h = TEXT_SIZE * TEXT_HEIGHT_RATIO;
  const x = 0;
  const y = 50 - h / 2;
  drawImage(ctx, image, x, y, w, h, canvasSize);
};
