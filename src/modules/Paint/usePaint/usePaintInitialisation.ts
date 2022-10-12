import { useEffect, useState, useCallback } from "react";
import { useRef } from "react";
import { DefaultColors } from "../SideMenu/ColorPicker/constants";
import { ToolNames } from "../SideMenu/constants";

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

  const setCanvasParamsValues = (ref: HTMLCanvasElement | null) => {
    // const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const ratio = 1;
    const params = ref ? { width: ref.clientWidth * ratio, height: ref.clientHeight * ratio } : { width: 0, height: 0 };
    canvasParams.current = params;

    return params;
  };
  const timeout: { current: NodeJS.Timeout | null } = useRef(null);
  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));

  const adjustCanvasParams = () => {
    setCanvasParams(setCanvasParamsValues(canvasRef.current));

    if (!tempData.current || !ctxRef.current || !canvasRef.current) return;

    if (timeout.current) clearTimeout(timeout.current);
    ctxRef.current.save();
    timeout.current = setTimeout(() => {
      if (!tempData.current || !ctxRef.current || !canvasRef.current) return;
      const canvas = document.createElement("canvas");
      canvas.width = tempData.current.width;
      canvas.height = tempData.current.height;
      const ctx1 = canvas.getContext("2d");
      if (!ctx1) return;
      ctx1.putImageData(tempData.current, 0, 0);
      const newWidth = canvasRef.current.clientWidth;
      const newheight = canvasRef.current.clientHeight;
      const oldWidth = tempData.current.width;
      const oldHeight = tempData.current.height;
      console.log("width", oldWidth, newWidth);
      console.log("height", oldHeight, newheight);

      ctxRef.current.scale(newWidth / oldWidth, newheight / oldHeight);
      ctxRef.current.drawImage(canvas, 0, 0);
      ctxRef.current?.restore();
    }, 200);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    position.current = { x: e.offsetX, y: e.offsetY };

    // position.current = {
    //   x: e.clientX - canvasRef.current.getBoundingClientRect().left,
    //   y: e.clientY - canvasRef.current.getBoundingClientRect().top,
    // };
    if (isDrawing.current) handleDraw();
  };

  const handleTouchMove = (e: TouchEvent) => {
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    position.current = { x, y };
    console.log(position.current);
    ctxRef.current?.lineTo(x, y);
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
