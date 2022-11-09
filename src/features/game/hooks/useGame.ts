import { useState } from "react";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";

export const useGame = () => {
  const [hoge, setHoge] = useState(-1);
  useAnimationFrame((ms: number) => setHoge(ms));
  return hoge;
};
