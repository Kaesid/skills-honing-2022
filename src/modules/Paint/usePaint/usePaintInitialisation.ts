import { useEffect, useState } from "react";
import { useRef } from "react";
import { DefaultColors } from "../SideMenu/ColorPicker/constants";
import { ToolNames } from "../SideMenu/constants";
import { useCanvasResize } from "./useCanvasResize";

interface IHandlers {
  handleDraw: () => void;
  handleMouseDown: (e: TouchEvent | MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseOut: () => void;
}
const usePaintInitialisation = (props: IHandlers) => {
  const { handleDraw, handleMouseDown, handleMouseUp, handleMouseOut } = props;
  const tempData = useRef<ImageData | null>(null);
  const toolRef = useRef(ToolNames.PENCIL);
  const colorRef = useRef(DefaultColors.BLACK);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasParams = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const { adjustCanvasParams, width, height } = useCanvasResize({
    canvasParams,
    ctxRef,
    canvasRef,
    tempData,
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    position.current = { x: e.offsetX, y: e.offsetY };

    if (isDrawing.current) handleDraw();
  };

  const handleTouchMove = (e: TouchEvent) => {
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    position.current = { x, y };
    if (isDrawing.current) handleDraw();
  };

  const resetCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    ctxRef.current = ref.getContext("2d");
    adjustCanvasParams();

    window.addEventListener("resize", adjustCanvasParams);

    ref.addEventListener("mousemove", handleMouseMove);

    ref.addEventListener("mousedown", handleMouseDown);

    ref.addEventListener("mouseup", handleMouseUp);

    ref.addEventListener("mouseout", handleMouseOut);

    ref.addEventListener("touchstart", handleMouseDown); //Here
    ref.addEventListener("touchend", handleMouseUp);
    ref.addEventListener("touchmove", handleTouchMove);
    ref.addEventListener("touchcancel", handleMouseUp);

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", handleMouseMove);
      ref.removeEventListener("mousedown", handleMouseDown);
      ref.removeEventListener("mouseup", handleMouseUp);
      ref.removeEventListener("mouseout", handleMouseOut);
      ref.removeEventListener("touchstart", handleMouseDown);
      ref.removeEventListener("touchend", handleMouseUp);
      ref.removeEventListener("touchmove", handleTouchMove);
      ref.removeEventListener("touchcancel", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    canvasRef,
    ctxRef,
    width,
    height,
    colorRef,
    position,
    isDrawing,
    resetCanvas,
    toolRef,
    canvasParams,
    tempData,
  };
};

export { usePaintInitialisation };
