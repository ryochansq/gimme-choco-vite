import { drawCount } from "./count";
import { drawDemoDrops, drawDrops } from "./drops";
import { drawMoa } from "./moa";
import { drawTexts } from "./texts";

const getCount = (drops: Drop[]) =>
  drops.filter((drop) => drop.type !== "hone").length;

export const draw = (
  ctx: CanvasRenderingContext2D,
  canvasSize: Size,
  input: Input,
  params: GameParameters,
  isDemo?: boolean
) => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawTexts(ctx, canvasSize, params.phase, params.ms);
  drawMoa(ctx, input, canvasSize, params.moa);
  drawDrops(ctx, canvasSize, params.drops);
  if (!isDemo) drawCount(ctx, canvasSize, getCount(params.drops));
  if (isDemo) drawDemoDrops(ctx, canvasSize);
};
