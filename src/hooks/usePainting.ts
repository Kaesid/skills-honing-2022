import { useRef, useEffect } from "react";

const usePainting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //   const ctx = useRef(canvasRef?.current?.getContext("2d"));

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;

    const mouseMoveCheck = (e: MouseEvent) => {
      console.log(e.clientX, e.clientY);
    };

    ref.addEventListener("mousemove", mouseMoveCheck);

    return () => ref.removeEventListener("mousemove", mouseMoveCheck);
  }, [canvasRef]);

  return { canvasRef };
};

export { usePainting };
