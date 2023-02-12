import { hasDropsLoaded } from "../../../functions/draw/drops";
import { hasMoaLoaded } from "../../../functions/draw/moa";
import { hasTextLoaded } from "../../../functions/draw/texts";

export const useLoadImage = () => {
  if (hasDropsLoaded() && hasMoaLoaded() && hasTextLoaded()) return;
  throw new Promise<void>(() => setTimeout(location.reload, 2000));
};
