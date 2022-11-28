/// <reference types="vite/client" />

type Input = "left" | "right" | "center";

type Size = {
  width: number;
  height: number;
};

type Phase = "GIVEME" | "CHOCOLATE" | "GAME" | "FINISH" | "END";

type DropType = "choco0" | "choco1" | "choco2" | "hone";

type Drop = {
  id: string;
  type: DropType;
  lane: Input;
  ms: number;
  x: number;
  y: number;
};

type ConditionType = "CATCHING" | "DAMAGED";

type Condition = {
  type: ConditionType;
  ms: number;
};

type Moa = {
  x: number;
  y: number;
  condition?: Condition;
};

type GameParameters = {
  phase: Phase;
  ms: number;
  moa: Moa;
  drops: Drop[];
  score: number;
};
