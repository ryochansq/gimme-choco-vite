import { drawImage } from "./utils";

const MOA_SIZE = 35;
const AMPLITUDE = {
  DAMAGED: 0.03,
  CATCHING: 0.055,
};

const getMoaImage = (
  input: Input,
  images: Images,
  conditionType?: ConditionType
) => {
  const image = {
    left: images.moaLeft,
    center: images.moa,
    right: images.moaRight,
    damaged: images.moaDamaged,
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
  images: Images,
  moa: Moa
) => {
  const image = getMoaImage(input, images, moa.condition?.type);
  const yScale = getMoaScale(moa.condition);
  const MOA_HEIGHT_RATIO = images.moa.height / images.moa.width;
  const w = MOA_SIZE;
  const h = MOA_SIZE * MOA_HEIGHT_RATIO * yScale;
  const x = moa.x - MOA_SIZE / 2;
  const y =
    moa.y - (MOA_SIZE * MOA_HEIGHT_RATIO) / 2 + (h / yScale) * (1 - yScale);
  drawImage(ctx, image, x, y, w, h, canvasSize);
};
