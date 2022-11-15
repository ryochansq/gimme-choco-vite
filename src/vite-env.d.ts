/// <reference types="vite/client" />

type Input = "left" | "right" | "center";

type Size = {
  width: number;
  height: number;
};

type Phase = "START" | "GAME" | "END";

type DropType = "choco0" | "choco1" | "choco2" | "hone";

type Drop = {
  type: DropType;
  lane: Input;
  ms: number;
  x: number;
  y: number;
};

type Moa = {
  x: number;
  y: number;
  condition?: {
    type: "CATCHING" | "DAMAGED";
    ms: number;
  };
};

type GameParameters = {
  phase: Phase;
  moa: Moa;
  drops: Drop[];
  score: number;
};
