import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: (ms: number) => void) => {
  const reqIdRef = useRef(0);
  const timestamp = useRef<number>();
  const loop: FrameRequestCallback = (nextTimestamp) => {
    reqIdRef.current = requestAnimationFrame(loop);
    const ms = timestamp.current ? nextTimestamp - timestamp.current : 0;
    timestamp.current = nextTimestamp;
    callback(ms);
  };

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [loop]);
};
