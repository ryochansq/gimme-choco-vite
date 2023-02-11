import { hasDropsLoaded } from "../../../functions/draw/drops";
import { hasMoaLoaded } from "../../../functions/draw/moa";
import { hasTextLoaded } from "../../../functions/draw/texts";

export const useLoadImage = () => {
  if (hasDropsLoaded() && hasMoaLoaded() && hasTextLoaded()) return;
  throw new Promise<void>((resolve) => setTimeout(resolve, 500));
};
