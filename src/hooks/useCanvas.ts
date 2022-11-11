import { useLayoutEffect, useState } from "react";
import { useLeftRightInput } from "./useLeftRightInput";

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const { input } = useLeftRightInput();

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

  return { ctx, canvasSize, input };
};
