const LANE_INTERVAL = 21; // 単位：pt
const MOA_MOVING_TIME = 60; // 単位：ms
const MOA_SPEED = (LANE_INTERVAL * 1.5) / MOA_MOVING_TIME; // 単位：pt/ms

const LANE = {
  left: 50 - LANE_INTERVAL,
  center: 50,
  right: 50 + LANE_INTERVAL,
};

const getNewMoa = (input: Input, moa: Moa, ms: number) => {
  const newMoa = { ...moa };
  const destination = LANE[input];
  const d = Math.round(MOA_SPEED * ms);
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

export const getUpdatedParams = (
  ms: number,
  input: Input,
  params: GameParameters
): GameParameters => {
  const newMs = params.ms + ms;
  const newMoa = getNewMoa(input, params.moa, ms);

  return { ...params, ms: newMs, moa: newMoa };
};
