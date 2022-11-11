import { useContext, useState } from "react";
import { draw } from "../../../hooks/draw";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { useCanvas } from "../../../hooks/useCanvas";
import { Context } from "../../../store";

export const useGame = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { setScore, setView } = useContext(Context);
  const { ctx, canvasSize, input } = useCanvas(canvasRef);

  const callback = (ms: number) => {
    // TODO: 経過ミリ秒数msに応じてゲーム全体のパラメータを更新したい
    draw(ctx, canvasSize, input);
    // TODO: scoreの更新とか？ゲーム開始・終了処理とか？
  };
  useAnimationFrame(callback);
};
