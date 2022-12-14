import { useContext, useState } from "react";
import { draw } from "../../../functions/draw";
import { makeDrops } from "../../../functions/makeDrops";
import { getUpdatedParams } from "../../../functions/params";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { useCanvas } from "../../../hooks/useCanvas";
import { Context } from "../../../store";

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { setScore, setView } = useContext(Context);
  const { ctx, canvasSize, input } = useCanvas(canvasRef);
  const [params, setParams] = useState<GameParameters>({
    phase: "GIVEME",
    ms: 0,
    moa: { x: 50, y: 91 },
    drops: makeDrops(),
    score: 0,
  });

  const callback = (ms: number) => {
    if (!ctx) return;
    const updatedParams = getUpdatedParams(ms, input, params);
    draw(ctx, canvasSize, input, ms, updatedParams);
    setParams(updatedParams);
    setScore(updatedParams.score);
    if (params.phase === "END") setView("Result");
  };
  useAnimationFrame(callback);
};
