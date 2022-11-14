import { useContext, useState } from "react";
import { draw } from "../../../functions/draw";
import { getUpdatedParams } from "../../../functions/params";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { useCanvas } from "../../../hooks/useCanvas";
import { Context } from "../../../store";

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { setScore, setView } = useContext(Context);
  const { ctx, canvasSize, input } = useCanvas(canvasRef);
  const [params, setParams] = useState<GameParameters>({
    phase: "START",
    moa: { x: 50, y: 91 },
    drops: [
      { type: "choco0", lane: "center", ms: 0 },
      { type: "choco1", lane: "left", ms: -2000 },
      { type: "choco2", lane: "center", ms: -2000 },
      { type: "hone", lane: "right", ms: -2000 },
    ],
    score: 0,
  });

  const callback = (ms: number) => {
    if (!ctx) return;
    const updatedParams = getUpdatedParams(ms, input, params);
    draw(ctx, canvasSize, input, ms, updatedParams);
    setParams(updatedParams);
    // TODO: scoreの更新とか？ゲーム開始・終了処理とか？
  };
  useAnimationFrame(callback);
};
