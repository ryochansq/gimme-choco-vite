const GIVEME_TIME = 1500; //単位：ms
const CHOCOLATE_TIME = 1800; //単位：ms
const FINISH_TIME = 2200; //単位：ms

const MOA_LANE_INTERVAL = 21; // 単位：pt
const MOA_MOVING_TIME = 30; // 単位：ms
const MOA_SPEED = MOA_LANE_INTERVAL / MOA_MOVING_TIME; // 単位：pt/ms
const MOA_LANE = {
  left: 50 - MOA_LANE_INTERVAL,
  center: 50,
  right: 50 + MOA_LANE_INTERVAL,
};
const DEMO_MOA_LANE = {
  left: 50 - 13,
  center: 50,
  right: 50 + 13,
};
const CATCHING_TIME = 200; //単位：ms
const DAMAGED_TIME = 600; // 単位：ms

const DROP_LANE_INTERVAL = 30;
export const DROP_LANE = {
  left: 50 - DROP_LANE_INTERVAL,
  center: 50,
  right: 50 + DROP_LANE_INTERVAL,
};
export const GRAVITY_CONSTANT_LOW = 0.04 / 900; // 単位：pt/ms^2
export const GRAVITY_CONSTANT_MID = 0.06 / 900; // 単位：pt/ms^2
export const GRAVITY_CONSTANT_HIGH = 0.07 / 900; // 単位：pt/ms^2

export const CATCHABLE_RANGE = {
  start: 99,
  end: 104,
};

const getNewMoa = (
  input: Input,
  moa: Moa,
  ms: number,
  catchingDropType?: DropType,
  isDemo = false
): Moa => {
  const LANE = isDemo ? DEMO_MOA_LANE : MOA_LANE;
  const newMoa = { ...moa };
  if (catchingDropType === "hone")
    return { ...moa, x: LANE.center, condition: { type: "DAMAGED", ms } };
  if (newMoa.condition) {
    newMoa.condition.ms += ms;
    if (newMoa.condition.type === "DAMAGED") {
      if (newMoa.condition.ms > DAMAGED_TIME) delete newMoa.condition;
      else return newMoa;
    }
    if (newMoa.condition?.type === "CATCHING") {
      if (newMoa.condition.ms > CATCHING_TIME) delete newMoa.condition;
    }
  }
  if (catchingDropType) newMoa.condition = { type: "CATCHING", ms };
  const destination = LANE[input];
  const d = MOA_SPEED * ms;
  if (destination > newMoa.x) {
    newMoa.x += d;
    if (destination < newMoa.x) newMoa.x = destination;
  } else if (destination < newMoa.x) {
    newMoa.x -= d;
    if (destination > newMoa.x) newMoa.x = destination;
  }
  if (newMoa.x < LANE.left) newMoa.x = LANE.left;
  if (newMoa.x > LANE.right) newMoa.x = LANE.right;
  return newMoa;
};

const getNewY = (newMs: number, level: Level) => {
  switch (level) {
    case "あまい":
      return -10 + GRAVITY_CONSTANT_LOW * Math.pow(newMs, 1.85);
    case "ふつう":
      return -10 + GRAVITY_CONSTANT_LOW * Math.pow(newMs, 1.9);
    case "からい":
      return -10 + GRAVITY_CONSTANT_LOW * Math.pow(newMs, 1.98);
    case "ヤバッ！":
      return -10 + GRAVITY_CONSTANT_HIGH * Math.pow(newMs, 2.02);
  }
};

const getNewDrops = (phase: Phase, drops: Drop[], ms: number, level: Level) =>
  phase === "GAME"
    ? drops
        .filter((drop) => drop.y < 150)
        .map((drop) => {
          const newMs = drop.ms + ms;
          if (newMs < 0) return { ...drop, ms: newMs };

          const x = DROP_LANE[drop.lane];
          const y = getNewY(newMs, level);
          return { ...drop, ms: newMs, x, y };
        })
    : drops;

const getCatchingDrop = (input: Input, params: GameParameters) => {
  if (params.moa.condition?.type === "DAMAGED") return;
  const { drops } = params;
  return drops.find(
    (drop) =>
      drop.lane === input &&
      CATCHABLE_RANGE.start <= drop.y &&
      drop.y <= CATCHABLE_RANGE.end
  );
};

const getNewScore = (score: number, dropType?: DropType) => {
  if (!dropType) return score;
  return dropType !== "hone" ? score + 1 : Math.max(score - 3, 0);
};

const getNewPhase = (phase: Phase, drops: Drop[], ms: number): Phase => {
  switch (phase) {
    case "GIVEME":
      return ms < GIVEME_TIME ? "GIVEME" : "CHOCOLATE";
    case "CHOCOLATE":
      return ms < CHOCOLATE_TIME ? "CHOCOLATE" : "GAME";
    case "GAME":
      return drops.length ? "GAME" : "FINISH";
    case "FINISH":
      return ms < FINISH_TIME ? "FINISH" : "END";
    default:
      return phase;
  }
};

export const getUpdatedParams = (
  ms: number,
  input: Input,
  params: GameParameters,
  isDemo = false
): GameParameters => {
  const drops = getNewDrops(params.phase, params.drops, ms, params.level);
  const catchingDrop = getCatchingDrop(input, params);
  const newDrops = catchingDrop
    ? drops.filter((drop) => drop.id !== catchingDrop.id)
    : drops;
  const moa = getNewMoa(input, params.moa, ms, catchingDrop?.type, isDemo);
  const score = getNewScore(params.score, catchingDrop?.type);
  const newPhase = getNewPhase(params.phase, newDrops, params.ms);
  const newMs = params.phase === newPhase ? params.ms + ms : 0;

  return { ...params, phase: newPhase, ms: newMs, moa, score, drops: newDrops };
};
