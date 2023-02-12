let loadedCount = 0;
const onload = () => loadedCount++;
export const hasAllLoaded = () => loadedCount >= 8;

const choco0 = new Image();
choco0.onload = onload;
choco0.src = "/drops/choco0.png";
const choco1 = new Image();
choco1.onload = onload;
choco1.src = "/drops/choco1.png";
const choco2 = new Image();
choco2.onload = onload;
choco2.src = "/drops/choco2.png";
const hone = new Image();
hone.onload = onload;
hone.src = "/drops/hone.png";
const moa = new Image();
moa.onload = onload;
moa.src = "/moa/moa.png";
const moaLeft = new Image();
moaLeft.onload = onload;
moaLeft.src = "/moa/moaLeft.png";
const moaRight = new Image();
moaRight.onload = onload;
moaRight.src = "/moa/moaRight.png";
const moaDamaged = new Image();
moaDamaged.onload = onload;
moaDamaged.src = "/moa/moaDamaged.png";
const giveMe = new Image();
giveMe.onload = () => onload;
giveMe.src = "/texts/giveMe.png";
const chocolate = new Image();
chocolate.onload = () => onload;
chocolate.src = "/texts/chocolate.png";
const finish = new Image();
finish.onload = () => onload;
finish.src = "/texts/finish.png";

export const useImage = (): Images => {
  if (hasAllLoaded())
    return {
      choco0,
      choco1,
      choco2,
      hone,
      moa,
      moaLeft,
      moaRight,
      moaDamaged,
      giveMe,
      chocolate,
      finish,
    };
  throw new Promise<void>((resolve) => setTimeout(resolve, 0));
};
