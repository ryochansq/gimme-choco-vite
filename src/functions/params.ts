const MOA_LANE_INTERVAL = 21; // 単位：pt
const MOA_MOVING_TIME = 60; // 単位：ms
const MOA_SPEED = (MOA_LANE_INTERVAL * 1.5) / MOA_MOVING_TIME; // 単位：pt/ms
const MOA_LANE = {
  left: 50 - MOA_LANE_INTERVAL,
  center: 50,
  right: 50 + MOA_LANE_INTERVAL,
};

const DROP_LANE_INTERVAL = 30;
export const DROP_LANE = {
  left: 50 - DROP_LANE_INTERVAL,
  center: 50,
  right: 50 + DROP_LANE_INTERVAL,
};
export const GRAVITY_CONSTANT = 0.07 / 900; // 単位：pt/ms^2

const getNewMoa = (input: Input, moa: Moa, ms: number) => {
  const newMoa = { ...moa };
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
  drops.map((drop) => ({ ...drop, ms: drop.ms + ms }));

export const getUpdatedParams = (
  ms: number,
  input: Input,
  params: GameParameters
): GameParameters => {
  const newMoa = getNewMoa(input, params.moa, ms);
  const newDrops = getNewDrops(params.drops, ms);

  return { ...params, moa: newMoa, drops: newDrops };
};
