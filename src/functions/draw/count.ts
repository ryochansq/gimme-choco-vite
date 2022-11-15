export const drawCount = (
  ctx: CanvasRenderingContext2D,
  { width }: Size,
  count: number
): void => {
  ctx.font = "40px sans-serif";

  const text1 = "のこり";
  const measuredText1 = ctx.measureText(text1);
  const x1 = width - measuredText1.width - 8;
  const y1 = 48;
  ctx.fillText(text1, x1, y1);

  const text2 = count.toString();
  const measuredText2 = ctx.measureText(text2);
  const x2 = width - measuredText2.width - 16;
  const y2 = 48 * 2;
  ctx.fillText(text2, x2, y2);
};
