import { drawImage } from "./utils";

const INTERVAL = 300; // 単位：ms
const DISPLAY_TIME = 1200; // 単位：ms
const TEXT_SIZE = 100;

const giveMeImage = new Image();
giveMeImage.src = "/texts/giveMe.png";
const chocolateImage = new Image();
chocolateImage.src = "/texts/chocolate.png";
const finishImage = new Image();
finishImage.src = "/texts/finish.png";
const TEXT_HEIGHT_RATIO = giveMeImage.height / giveMeImage.width;

const getTextImage = (phase: Phase) => {
  const image = {
    GIVEME: giveMeImage,
    CHOCOLATE: chocolateImage,
    GAME: finishImage,
    FINISH: finishImage,
    END: finishImage,
  };
  return image[phase];
};

export const drawTexts = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  phase: Phase,
  ms: number
) => {
  if (!["GIVEME", "CHOCOLATE", "FINISH"].includes(phase)) return;
  if (ms < INTERVAL || INTERVAL + DISPLAY_TIME < ms) return;
  const image = getTextImage(phase);
  const w = TEXT_SIZE;
  const h = TEXT_SIZE * TEXT_HEIGHT_RATIO;
  const x = 0;
  const y = 50 - h / 2;
  drawImage(ctx, image, x, y, w, h, canvasSize);
};
