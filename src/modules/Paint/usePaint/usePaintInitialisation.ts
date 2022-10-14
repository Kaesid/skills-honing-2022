import { useEffect, useState } from "react";
import { useRef } from "react";
import { DefaultColors } from "../SideMenu/ColorPicker/constants";
import { ToolNames } from "../SideMenu/constants";
import { useCanvasResize } from "./useCanvasResize";

interface IHandlers {
  // handleDraw: () => void;
  handleMouseDown: (e: TouchEvent | MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseOut: () => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
}
const usePaintInitialisation = (props: IHandlers) => {
  const { handleMouseDown, handleMouseUp, handleMouseOut, handleMouseMove, handleTouchMove } = props;
  const savedCanvasDataRef = useRef<ImageData | null>(null);
  const toolRef = useRef(ToolNames.PENCIL);
  const colorRef = useRef(DefaultColors.BLACK);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasParams = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    canvasParams,
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
  });

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
    savedCanvasDataRef,
  };
};

export { usePaintInitialisation };
