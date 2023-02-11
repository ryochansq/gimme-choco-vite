import { useState } from "react";
import { draw } from "../../../functions/draw";
import { makeDrops } from "../../../functions/makeDrops";
import { getUpdatedParams } from "../../../functions/params";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { useCanvas } from "../../../hooks/useCanvas";
import { useLoadImage } from "./useLoadImage";

export const useDemo = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { ctx, canvasSize, input } = useCanvas(canvasRef, true);
  const [params, setParams] = useState<GameParameters>({
    phase: "END",
    ms: 0,
    moa: { x: 50, y: 27 },
    drops: makeDrops("あまい"),
    score: 0,
    level: "あまい",
  });
  useLoadImage();

  const callback = (ms: number) => {
    if (!ctx) return;
    const updatedParams = getUpdatedParams(ms, input, params, true);
    draw(ctx, canvasSize, input, updatedParams, true);
    setParams(updatedParams);
  };

  useAnimationFrame(callback);
};
