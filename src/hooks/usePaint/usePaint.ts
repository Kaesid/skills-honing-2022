import { useRef, useEffect, useState } from "react";
// import { getPaintColor, setPaintColor } from "../../modules/Paint/paintSlice";
// import { useAppSelector } from "../../redux/hooks";

import { IDraw } from "../../modules/Paint/Canvas/Canvas";
// import { useAppDispatch } from "../../redux/hooks";
import { useSaveCanvas } from "./useSaveCanvas";

interface IPainting {
  toolName: string;
}

const usePaint = (props: IPainting) => {
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
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    // if (ref) {
    //   ref.width = ref.offsetWidth * ratio;
    //   ref.height = ref.offsetHeight * ratio;
    // }

    return ref ? { width: ref.clientWidth * ratio, height: ref.clientHeight * ratio } : { width: 0, height: 0 };
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef });
  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const clear = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
  };

  useEffect(() => {
    if (!width || !height || !ctxRef.current || !canvasRef.current) return;
    console.log(width);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [width, height]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;

    setCanvasParams(setCanvasParamsValues(ref));
    const ctx = ref.getContext("2d");
    ctxRef.current = ctx;

    const mouseMoveCheck = (e: MouseEvent) => {
      position.current = { x: e.offsetX, y: e.offsetY };
      if (isDrawing.current) draw({ position: position.current, ctx });
    };

    const adjustCanvasParams = () => {
      setCanvasParams(setCanvasParamsValues(ref));
    };

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
    });

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", mouseMoveCheck);
    };
  }, [canvasRef]);

  return { canvasRef, width, height, colorRef: currentColor, saveCanvas, dataUrl, clear };
};

export { usePaint };
