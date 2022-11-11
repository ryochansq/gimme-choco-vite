import { useContext, useLayoutEffect, useState } from "react";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { Input, useLeftRightInput } from "../../../hooks/useLeftRightInput";
import { Context } from "../../../store";

type Size = {
  width: number;
  height: number;
};

const MOA_SIZE = 35;
const CHOCO_SIZE = 15;
const moa = new Image();
moa.src = "/moa/moa.png";
const moaLeft = new Image();
moaLeft.src = "/moa/moaLeft.png";
const moaRight = new Image();
moaRight.src = "/moa/moaRight.png";
const MOA_HEIGHT_RATIO = moa.height / moa.width;

const getMoaDx = (width: number, input: Input) => {
  const lane = {
    left: 29,
    center: 50,
    right: 71,
  };
  return (width / 100) * (lane[input] - MOA_SIZE / 2);
};

const getMoaImage = (input: Input) => {
  const image = {
    left: moaLeft,
    center: moa,
    right: moaRight,
  };
  return image[input];
};

const drawImage = (
  image: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  canvasSize: Size
) => {};

const draw = (
  ctx: CanvasRenderingContext2D | undefined,
  { width, height }: Size,
  input: Input
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  const image = getMoaImage(input);
  const dx = getMoaDx(width, input);
  const dy = (width / 100) * 65;
  const dw = (width / 100) * MOA_SIZE;
  const dh = dw * MOA_HEIGHT_RATIO;
  ctx.drawImage(image, dx, dy, dw, dh);
};

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { setScore, setView } = useContext(Context);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const { input } = useLeftRightInput();

  useAnimationFrame(() => draw(ctx, canvasSize, input));

  // init
  useLayoutEffect(() => {
    // canvasのwidthとheightを、Retina対応のため2倍で設定
    const canvas = canvasRef.current!;
    const parent = canvas.parentNode;
    canvas.width = (parent as HTMLBaseElement).clientWidth * 2;
    canvas.height = (parent as HTMLBaseElement).clientHeight * 2;
    const context = canvas.getContext("2d");
    setCtx(context!);
    setCanvasSize({ width: canvas.width, height: canvas.height });
  }, []);
};
