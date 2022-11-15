const MOA_LANE_INTERVAL = 21; // 単位：pt
const MOA_MOVING_TIME = 40; // 単位：ms
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
export const GRAVITY_CONSTANT = 0.07 / 900; // 単位：pt/ms^2

export const CATCHABLE_RANGE = {
  start: 98,
  end: 103,
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
  if (params.moa.condition?.type === "DAMAGED") return undefined;
  const { drops } = params;
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    if (drop.lane !== input) continue;
    if (CATCHABLE_RANGE.start <= drop.y && drop.y <= CATCHABLE_RANGE.end)
      return { ...drop, index: i };
  }
  return undefined;
};

const isChoco = (dropType?: DropType) => dropType && dropType !== "hone";

export const getUpdatedParams = (
  ms: number,
  input: Input,
  params: GameParameters
): GameParameters => {
  const drops = getNewDrops(params.drops, ms);
  const catchingDrop = getCatchingDrop(input, params);
  const newDrops = catchingDrop
    ? drops.filter((_, index) => index !== catchingDrop.index)
    : drops;
  const moa = getNewMoa(input, params.moa, ms, catchingDrop?.type);
  const score = params.score + (isChoco(catchingDrop?.type) ? 1 : 0);

  return { ...params, moa, score, drops: newDrops };
};
