export const drawImage = (
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  { width }: Size
) => {
  const dx = Math.round((width / 100) * x);
  const dy = Math.round((width / 100) * y);
  const dw = Math.round((width / 100) * w);
  const dh = Math.round((width / 100) * h);
  ctx.drawImage(image, dx, dy, dw, dh);
};
