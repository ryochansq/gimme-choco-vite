import { drawMoa } from "./moa";

export const draw = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  input: Input,
  params: GameParameters
) => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawMoa(ctx, input, canvasSize, params.moa);
};
