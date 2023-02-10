import _ from "lodash";

const INTERVAL = 1000;
const GAP = 220;
const ADDING_SEED = _.random(1);

const PLAN = [
  { choco: 1, hone: 0 },
  { choco: 2, hone: 0 },
  { choco: 2, hone: 0 },
  { choco: 3, hone: 1 },
  { choco: 5, hone: 1 },
  { choco: 5, hone: 0 },
  { choco: 4, hone: 2 },
  { choco: 10, hone: 2 },
  { choco: 8, hone: 1 },
  { choco: 10, hone: 2 },
  { choco: 20, hone: 3 },
  { choco: 30, hone: 5 },
];

const getRandomChocoType = (): DropType => {
  const r = _.random(2);
  if (r === 0) return "choco0";
  if (r === 1) return "choco1";
  return "choco2";
};

const getRandomLane = (): Input => {
  const r = _.random(2);
  if (r === 0) return "left";
  if (r === 1) return "center";
  return "right";
};

const getRandomAddingLane = (lane: Input) => {
  const r = _.random(1);
  if (lane === "left") return r ? "center" : "right";
  if (lane === "center") return r ? "left" : "right";
  return r ? "left" : "center";
};

const shouldAdd = (index: number, level: Level) => {
  if (level === "あまい" || level === "ふつう") return false;
  if (index < 5) return false;
  if (index < 30) return index % 5 === ADDING_SEED;
  if (index < 70) return index % 3 === ADDING_SEED;
  return index % 2 === ADDING_SEED;
};

const getRandomDrop = (isHone?: "hone"): Drop => ({
  id: _.uniqueId(),
  type: isHone ? "hone" : getRandomChocoType(),
  lane: getRandomLane(),
  ms: 0,
  x: 0,
  y: 0,
});

const getGap = (level: Level) => {
  switch (level) {
    case "あまい":
      return _.random(GAP * 2.1, GAP * 2.3);
    case "ふつう":
      return _.random(GAP * 1.9, GAP * 2.1);
    case "からい":
      return _.random(GAP * 1.1, GAP * 1.5);
    case "ヤバッ！":
      return _.random(GAP * 1.0, GAP * 1.2);
  }
};

export const makeDrops = (level: Level): Drop[] => {
  const ret = PLAN.reduce<Drop[]>((prev, { choco, hone }) => {
    if (prev.length === 0) return [{ ...getRandomDrop(), lane: "center" }];
    let lastMs = prev.slice(-1)[0].ms - INTERVAL;
    const chocos = new Array<Drop>(choco)
      .fill(getRandomDrop())
      .map(() => getRandomDrop());
    const hones = new Array<Drop>(hone)
      .fill(getRandomDrop("hone"))
      .map(() => getRandomDrop("hone"));
    const drops = _.shuffle([...chocos, ...hones]).map((drop) => {
      const ms = lastMs - getGap(level);
      lastMs = ms;
      return { ...drop, ms };
    });
    return [...prev, ...drops];
  }, []).reduce<Drop[]>((prev, cur, index) => {
    const drops = [...prev, cur];
    if (shouldAdd(index, level))
      drops.push({
        ...cur,
        id: _.uniqueId(),
        lane: getRandomAddingLane(cur.lane),
        type: "hone",
      });
    return drops;
  }, []);
  return level === "あまい" ? ret.filter((drop) => drop.type !== "hone") : ret;
};
