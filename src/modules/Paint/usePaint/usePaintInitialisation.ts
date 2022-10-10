import { useEffect, useState, useCallback } from "react";
import { useRef } from "react";
import { DefaultColors } from "../SideMenu/ColorPicker/constants";
import { ToolNames } from "../SideMenu/constants";

interface IHandlers {
  handleDraw: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseOut: () => void;
}
const usePaintInitialisation = (props: IHandlers) => {
  const { handleDraw, handleMouseDown, handleMouseUp, handleMouseOut } = props;

  const toolRef = useRef(ToolNames.PENCIL);
  const colorRef = useRef(DefaultColors.BLACK);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasParams = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const setCanvasParamsValues = (ref: HTMLCanvasElement | null) => {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const params = ref ? { width: ref.clientWidth * ratio, height: ref.clientHeight * ratio } : { width: 0, height: 0 };
    canvasParams.current = params;

    return params;
  };

  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));

  const adjustCanvasParams = () => {
    setCanvasParams(setCanvasParamsValues(canvasRef.current));
  };

  const handleMouseMove = (e: MouseEvent) => {
    position.current = { x: e.offsetX, y: e.offsetY };
    if (isDrawing.current) handleDraw();
  };

  const resetCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
  };

  useEffect(() => {
    if (!width || !height || !ctxRef.current || !canvasRef.current) return;
    console.log(width);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, width, height);
  }, [width, height]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    adjustCanvasParams();
    ctxRef.current = ref.getContext("2d");

    window.addEventListener("resize", adjustCanvasParams);

    ref.addEventListener("mousemove", handleMouseMove);

    ref.addEventListener("mousedown", handleMouseDown);

    ref.addEventListener("mouseup", handleMouseUp);

    ref.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", handleMouseMove);
      ref.removeEventListener("mousedown", handleMouseDown);
      ref.removeEventListener("mouseup", handleMouseUp);
      ref.removeEventListener("mouseout", handleMouseOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, ctxRef, width, height, colorRef, position, isDrawing, resetCanvas, toolRef, canvasParams };
};

export { usePaintInitialisation };
