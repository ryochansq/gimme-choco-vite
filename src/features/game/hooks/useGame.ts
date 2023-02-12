import { useContext, useState } from "react";
import { draw } from "../../../functions/draw";
import { makeDrops } from "../../../functions/makeDrops";
import { getUpdatedParams } from "../../../functions/params";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { useCanvas } from "../../../hooks/useCanvas";
import { useImage } from "../../../hooks/useImage";
import { Context } from "../../../store";

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const images = useImage();
  const { setScore, setView, level } = useContext(Context);
  const { ctx, canvasSize, input } = useCanvas(canvasRef);
  const [params, setParams] = useState<GameParameters>({
    phase: "GIVEME",
    ms: 0,
    moa: { x: 50, y: 91 },
    drops: makeDrops(level),
    score: 0,
    level,
  });

  const callback = (ms: number) => {
    if (!ctx) return;
    const updatedParams = getUpdatedParams(ms, input, params);
    draw(ctx, canvasSize, images, input, updatedParams);
    setParams(updatedParams);
    setScore(updatedParams.score);
    if (params.phase === "END") setView("Result");
  };
  useAnimationFrame(callback);
};
