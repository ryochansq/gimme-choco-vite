import { drawImage } from "./utils";

const MOA_SIZE = 35;
const moaImage = new Image();
moaImage.src = "/moa/moa.png";
const moaLeftImage = new Image();
moaLeftImage.src = "/moa/moaLeft.png";
const moaRightImage = new Image();
moaRightImage.src = "/moa/moaRight.png";
const MOA_HEIGHT_RATIO = moaImage.height / moaImage.width;

const getMoaImage = (input: Input) => {
  const image = {
    left: moaLeftImage,
    center: moaImage,
    right: moaRightImage,
  };
  return image[input];
};

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  input: Input,
  canvasSize: Size,
  moa: Moa
) => {
  const image = getMoaImage(input);
  const x = moa.x - MOA_SIZE / 2;
  const y = moa.y - (MOA_SIZE * MOA_HEIGHT_RATIO) / 2;
  const w = MOA_SIZE;
  const h = MOA_SIZE * MOA_HEIGHT_RATIO;
  drawImage(ctx, image, x, y, w, h, canvasSize);
};
