import { useRef, useEffect, useState } from "react";
import { getPaintColor, setPaintColor } from "../modules/Paint/paintSlice";
import { useAppSelector } from "../redux/hooks";

import { IDraw } from "./../modules/Paint/Canvas/Canvas";
import { useAppDispatch } from "./../redux/hooks";

// interface IPainting {
//   draw: (props: IDraw) => void;
// }

const usePainting = () => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(getPaintColor);
  const currentColor = useRef("");

  const setColor = (color: string) => {
    currentColor.current = color;
    dispatch(setPaintColor(color));
  };

  const draw = (props: IDraw) => {
    const { x, y, ctx } = props;
    if (!ctx) return;
    ctx.fillStyle = currentColor.current;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 3);
    ctx.fill();
  };

  const setCanvasParamsValues = (ref: HTMLCanvasElement | null) => {
    return ref ? { width: ref.clientWidth, height: ref.clientHeight } : { width: 0, height: 0 };
  };

  const [dataUrl, setDataUrl] = useState("#");

  const download = () => {
    if (!canvasRef.current) return;

    setDataUrl(canvasRef.current.toDataURL("image/png"));
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    setCanvasParams(setCanvasParamsValues(ref));
    const ctx = ref.getContext("2d");

    const mouseMoveCheck = (e: MouseEvent) => {
      const { x, y } = { x: e.offsetX, y: e.offsetY };
      draw({ x, y, ctx });
    };

    const adjustCanvasParams = () => setCanvasParams(setCanvasParamsValues(ref));

    window.addEventListener("resize", adjustCanvasParams);

    ref.addEventListener("mousemove", mouseMoveCheck);

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", mouseMoveCheck);
    };
  }, [canvasRef]);

  return { canvasRef, width, height, color, currentColor, setColor, download, dataUrl };
};

export { usePainting };
