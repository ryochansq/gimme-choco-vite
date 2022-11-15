import { drawCount } from "./count";
import { drawDrops } from "./drops";
import { drawMoa } from "./moa";

export const draw = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  input: Input,
  ms: number,
  params: GameParameters
) => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawMoa(ctx, input, canvasSize, params.moa);
  drawDrops(ctx, canvasSize, ms, params.drops);
  drawCount(ctx, canvasSize, params.drops.length);
};
