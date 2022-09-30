import { useRef, useEffect, useState } from "react";

const usePainting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const ctx = useRef(canvasRef.current?.getContext("2d"));
  const [{ width, height }, setCanvasParams] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    setCanvasParams({ width: ref.clientWidth, height: ref.clientHeight });
    const ctx = ref.getContext("2d");

    const mouseMoveCheck = (e: MouseEvent) => {
      const { x, y } = { x: e.offsetX, y: e.offsetY };
      // console.log(x, y);
      if (!ctx) return;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 3);
      ctx.fill();
    };

    ref.addEventListener("mousemove", mouseMoveCheck);

    return () => ref.removeEventListener("mousemove", mouseMoveCheck);
  }, [canvasRef]);

  return { canvasRef, width, height };
};

export { usePainting };
