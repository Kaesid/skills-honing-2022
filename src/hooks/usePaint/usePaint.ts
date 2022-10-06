import { useRef, useEffect, useState } from "react";
// import { getPaintColor, setPaintColor } from "../../modules/Paint/paintSlice";
// import { useAppSelector } from "../../redux/hooks";

import { IDraw } from "../../modules/Paint/Canvas/Canvas";
// import { useAppDispatch } from "../../redux/hooks";
import { useSaveCanvas } from "./useSaveCanvas";

// interface IPainting {
//   draw: (props: IDraw) => void;
// }

const usePaint = () => {
  // const dispatch = useAppDispatch();
  // const color = useAppSelector(getPaintColor);
  const currentColor = useRef("#aabbcc");

  // const setColor = (color: string) => {
  //   currentColor.current = color;
  //   dispatch(setPaintColor(color));
  // };

  const draw = (props: IDraw) => {
    const { position, ctx } = props;
    const { x, y } = position;
    if (!ctx) return;
    ctx.fillStyle = currentColor.current;
    ctx.strokeStyle = currentColor.current;
    // ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
    // ctx.arc(x, y, 3, 0, Math.PI * 3);
    // ctx.fill();
  };

  const setCanvasParamsValues = (ref: HTMLCanvasElement | null) => {
    return ref ? { width: ref.clientWidth, height: ref.clientHeight } : { width: 0, height: 0 };
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef });
  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;

    setCanvasParams(setCanvasParamsValues(ref));
    const ctx = ref.getContext("2d");

    const mouseMoveCheck = (e: MouseEvent) => {
      position.current = { x: e.offsetX, y: e.offsetY };
      if (isDrawing.current) draw({ position: position.current, ctx });
    };

    const adjustCanvasParams = () => setCanvasParams(setCanvasParamsValues(ref));

    window.addEventListener("resize", adjustCanvasParams);

    ref.addEventListener("mousemove", mouseMoveCheck);

    ref.addEventListener("mousedown", () => {
      isDrawing.current = true;
      ctx?.beginPath();
      ctx?.lineTo(position.current.x, position.current.y);
    });

    ref.addEventListener("mouseup", () => {
      isDrawing.current = false;
      ctx?.closePath();
    });

    ref.addEventListener("mouseout", () => {
      isDrawing.current = false;
      ctx?.closePath();
    });

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", mouseMoveCheck);
    };
  }, [canvasRef]);

  return { canvasRef, width, height, colorRef: currentColor, saveCanvas, dataUrl };
};

export { usePaint };
