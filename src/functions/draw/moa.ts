import { drawImage } from "./utils";

const MOA_SIZE = 35;
const moaImage = new Image();
moaImage.onload = () => (hasLoaded[0] = true);
moaImage.src = "/moa/moa.png";
const moaLeftImage = new Image();
moaLeftImage.onload = () => (hasLoaded[1] = true);
moaLeftImage.src = "/moa/moaLeft.png";
const moaRightImage = new Image();
moaRightImage.onload = () => (hasLoaded[2] = true);
moaRightImage.src = "/moa/moaRight.png";
const moaDamagedImage = new Image();
moaDamagedImage.onload = () => (hasLoaded[3] = true);
moaDamagedImage.src = "/moa/moaDamaged.png";

const hasLoaded = new Array<boolean>(4).fill(false);
export const hasMoaLoaded = () => hasLoaded.every((val) => val);

const MOA_HEIGHT_RATIO = moaImage.height / moaImage.width;
const AMPLITUDE = {
  DAMAGED: 0.03,
  CATCHING: 0.055,
};

const getMoaImage = (input: Input, conditionType?: ConditionType) => {
  const image = {
    left: moaLeftImage,
    center: moaImage,
    right: moaRightImage,
    damaged: moaDamagedImage,
  };
  if (conditionType === "DAMAGED") return image.damaged;
  return image[input];
};

const getMoaScale = (condition?: Condition) => {
  if (!condition) return 1;
  const a = AMPLITUDE[condition.type];
  return 1 - a - a * Math.sin((condition.ms / 100 - 1 / 2) * Math.PI);
};

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  input: Input,
  canvasSize: Size,
  moa: Moa
) => {
  const image = getMoaImage(input, moa.condition?.type);
  const yScale = getMoaScale(moa.condition);
  const w = MOA_SIZE;
  const h = MOA_SIZE * MOA_HEIGHT_RATIO * yScale;
  const x = moa.x - MOA_SIZE / 2;
  const y =
    moa.y - (MOA_SIZE * MOA_HEIGHT_RATIO) / 2 + (h / yScale) * (1 - yScale);
  drawImage(ctx, image, x, y, w, h, canvasSize);
};
