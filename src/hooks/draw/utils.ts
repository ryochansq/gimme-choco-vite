export const drawImage = (
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  { width }: Size
) => {
  const dx = (width / 100) * x;
  const dy = (width / 100) * y;
  const dw = (width / 100) * w;
  const dh = (width / 100) * h;
  ctx.drawImage(image, dx, dy, dw, dh);
};
