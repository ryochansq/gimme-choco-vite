const MOA_LANE_INTERVAL = 21; // 単位：pt
const MOA_MOVING_TIME = 30; // 単位：ms
const MOA_SPEED = MOA_LANE_INTERVAL / MOA_MOVING_TIME; // 単位：pt/ms
const MOA_LANE = {
  left: 50 - MOA_LANE_INTERVAL,
  center: 50,
  right: 50 + MOA_LANE_INTERVAL,
};
const CATCHING_TIME = 200; //単位：ms
const DAMAGED_TIME = 600; // 単位：ms

const DROP_LANE_INTERVAL = 30;
export const DROP_LANE = {
  left: 50 - DROP_LANE_INTERVAL,
  center: 50,
  right: 50 + DROP_LANE_INTERVAL,
};
export const GRAVITY_CONSTANT = 0.06 / 900; // 単位：pt/ms^2

export const CATCHABLE_RANGE = {
  start: 99,
  end: 104,
};

const getNewMoa = (
  input: Input,
  moa: Moa,
  ms: number,
  catchingDropType?: DropType
): Moa => {
  const newMoa = { ...moa };
  if (catchingDropType === "hone")
    return { ...moa, x: MOA_LANE.center, condition: { type: "DAMAGED", ms } };
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
  const destination = MOA_LANE[input];
  const d = MOA_SPEED * ms;
  if (destination > newMoa.x) {
    newMoa.x += d;
    if (destination < newMoa.x) newMoa.x = destination;
  } else if (destination < newMoa.x) {
    newMoa.x -= d;
    if (destination > newMoa.x) newMoa.x = destination;
  }
  if (newMoa.x < MOA_LANE.left) newMoa.x = MOA_LANE.left;
  if (newMoa.x > MOA_LANE.right) newMoa.x = MOA_LANE.right;
  return newMoa;
};

const getNewDrops = (drops: Drop[], ms: number) =>
  drops
    .filter((drop) => drop.y < 150)
    .map((drop) => {
      const newMs = drop.ms + ms;
      if (newMs < 0) return { ...drop, ms: newMs };

      const x = DROP_LANE[drop.lane];
      const y = GRAVITY_CONSTANT * newMs * newMs;
      return { ...drop, ms: newMs, x, y };
    });

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

export const getUpdatedParams = (
  ms: number,
  input: Input,
  params: GameParameters
): GameParameters => {
  const drops = getNewDrops(params.drops, ms);
  const catchingDrop = getCatchingDrop(input, params);
  const newDrops = catchingDrop
    ? drops.filter((drop) => drop.id !== catchingDrop.id)
    : drops;
  const moa = getNewMoa(input, params.moa, ms, catchingDrop?.type);
  const score = getNewScore(params.score, catchingDrop?.type);

  return { ...params, moa, score, drops: newDrops };
};
