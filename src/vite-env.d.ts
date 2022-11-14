/// <reference types="vite/client" />

type Input = "left" | "right" | "center";

type Size = {
  width: number;
  height: number;
};

type Phase = "START" | "GAME" | "END";

type Drop = {
  type: "choco0" | "choco1" | "choco2" | "hone";
  lane: Input;
  ms: number;
};

type MOVING = {
  type: "MOVING";
  speed: number;
};

type NORMAL = {
  type: "NORMAL";
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
  ms: number;
  moa: Moa;
  drops: Drop[];
  score: number;
};
