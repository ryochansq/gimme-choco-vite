import { drawCount } from "./count";
import { drawDrops } from "./drops";
import { drawMoa } from "./moa";
import { drawTexts } from "./texts";

const getCount = (drops: Drop[]) =>
  drops.filter((drop) => drop.type !== "hone").length;

export const draw = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  input: Input,
  ms: number,
  params: GameParameters
) => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawTexts(ctx, canvasSize, params.phase, params.ms);
  drawMoa(ctx, input, canvasSize, params.moa);
  drawDrops(ctx, canvasSize, params.drops);
  drawCount(ctx, canvasSize, getCount(params.drops));
};
