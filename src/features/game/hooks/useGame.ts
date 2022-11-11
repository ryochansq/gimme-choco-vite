import { useContext, useLayoutEffect, useState } from "react";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { Input, useLeftRightInput } from "../../../hooks/useLeftRightInput";
import { Context } from "../../../store";

const HEIGHT_RATIO = 1.2;
const MOA_SIZE = 35;
const CHOCO_SIZE = 15;
const moa = new Image();
moa.src = "/moa.png";
const MOA_HEIGHT_RATIO = moa.height / moa.width;

const getMoaDx = (width: number, input: Input) => {
  const lane = {
    left: 29,
    center: 50,
    right: 71,
  };
  return (width / 100) * (lane[input] - MOA_SIZE / 2);
};

const draw = (
  ctx: CanvasRenderingContext2D | undefined,
  width: number,
  input: Input
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, width * HEIGHT_RATIO);
  const image = moa;
  const dx = getMoaDx(width, input);
  const dy = (width / 100) * 65;
  const dw = (width / 100) * MOA_SIZE;
  const dh = dw * MOA_HEIGHT_RATIO;
  ctx.drawImage(image, dx, dy, dw, dh);
};

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { setScore, setView } = useContext(Context);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [width, setWidth] = useState(0);

  const { input } = useLeftRightInput();

  useAnimationFrame(() => draw(ctx, width, input));

  // init
  useLayoutEffect(() => {
    // canvasのwidthとheightを、100%で指定したいのでここで設定
    const canvas = canvasRef.current!;
    const parent = canvas.parentNode;
    canvas.width = (parent as HTMLBaseElement).clientWidth;
    canvas.height = canvas.width * HEIGHT_RATIO;
    const context = canvas.getContext("2d");
    setCtx(context!);
    setWidth(canvasRef.current!.clientWidth);
  }, []);
};
