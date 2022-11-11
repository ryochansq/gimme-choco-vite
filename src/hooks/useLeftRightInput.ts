import { useEffect, useState } from "react";

const isLeft = (x: number) => x <= document.body.clientWidth / 2;

export const useLeftRightInput = (): { input: Input } => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  const input = left ? "left" : right ? "right" : "center";

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvents, false);
    document.addEventListener("keyup", handleKeyEvents, false);
    document.addEventListener("touchstart", handleTouchEvents, false);
    document.addEventListener("touchend", handleTouchEvents, false);
    document.addEventListener("touchcancel", handleTouchEvents, false);
    document.addEventListener("touchmove", handleTouchEvents, false);
    return () => {
      document.removeEventListener("keydown", handleKeyEvents, false);
      document.removeEventListener("keyup", handleKeyEvents, false);
      document.removeEventListener("touchstart", handleTouchEvents, false);
      document.removeEventListener("touchend", handleTouchEvents, false);
      document.removeEventListener("touchcancel", handleTouchEvents, false);
      document.removeEventListener("touchmove", handleTouchEvents, false);
    };
  }, []);

  const handleKeyEvents = (event: KeyboardEvent) => {
    const isDown = event.type === "keydown";
    if (event.key === "Left" || event.key === "ArrowLeft") {
      setLeft(isDown);
    } else if (event.key === "Right" || event.key === "ArrowRight") {
      setRight(isDown);
    }
    event.preventDefault();
  };

  const handleTouchEvents = (event: TouchEvent) => {
    let isLeftTouched = false;
    let isRightTouched = false;
    for (let i = 0; i < event.touches.length; i++) {
      const x = event.touches.item(i)?.clientX;
      if (!x) continue;
      if (isLeft(x)) isLeftTouched = true;
      else isRightTouched = true;
    }
    setLeft(isLeftTouched);
    setRight(isRightTouched);
    event.preventDefault();
  };

  return { input };
};
