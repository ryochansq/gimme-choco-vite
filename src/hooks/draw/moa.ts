import { drawImage } from "./utils";

const MOA_SIZE = 35;
const moa = new Image();
moa.src = "/moa/moa.png";
const moaLeft = new Image();
moaLeft.src = "/moa/moaLeft.png";
const moaRight = new Image();
moaRight.src = "/moa/moaRight.png";
const MOA_HEIGHT_RATIO = moa.height / moa.width;

const getMoaX = (input: Input) => {
  const lane = {
    left: 29,
    center: 50,
    right: 71,
  };
  return lane[input] - MOA_SIZE / 2;
};

const getMoaImage = (input: Input) => {
  const image = {
    left: moaLeft,
    center: moa,
    right: moaRight,
  };
  return image[input];
};

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  input: Input,
  canvasSize: Size
) => {
  const image = getMoaImage(input);
  const x = getMoaX(input);
  const y = 65;
  const w = MOA_SIZE;
  const h = MOA_SIZE * MOA_HEIGHT_RATIO;
  drawImage(ctx, image, x, 65, w, h, canvasSize);
};
