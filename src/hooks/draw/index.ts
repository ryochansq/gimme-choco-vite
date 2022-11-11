import { drawMoa } from "./moa";

export const draw = (
  ctx: CanvasRenderingContext2D | undefined,
  canvasSize: Size,
  input: Input
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawMoa(ctx, input, canvasSize);
};
