import { useEffect } from "react";
import { useRef } from "react";
import { IHandlers, ISizeParams, IToolsList } from "../interface";
import { DefaultColors } from "../SideMenu/ColorPicker/constants";
import { ToolNames } from "../SideMenu/constants";
import { Brush } from "../tools/Brush";
import { Eraser } from "../tools/Eraser";
import { Pencil } from "../tools/Pencil";
import { useCanvasResize } from "./useCanvasResize";

const usePaintInitialisation = (props: IHandlers) => {
  const { handleDrawActivation, handleDrawFinish, handleCursorOut, handleCursorMove } = props;
  const savedCanvasDataRef = useRef<ImageData | null>(null);
  const toolRef = useRef(ToolNames.PENCIL);
  const colorRef = useRef(DefaultColors.BLACK);
  const position = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasParams = useRef<ISizeParams>({ width: 0, height: 0 });
  const toolsRef = useRef<IToolsList | null>(null);

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    canvasParams,
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    ctxRef.current = ref.getContext("2d", { willReadFrequently: true });
    adjustCanvasParams();
    const props = { ctxRef, position, colorRef };
    toolsRef.current = {
      [ToolNames.PENCIL]: new Pencil(props),
      [ToolNames.ERASER]: new Eraser(props),
      [ToolNames.BRUSH]: new Brush(props),
    };
    window.addEventListener("resize", adjustCanvasParams);

    ref.addEventListener("mousemove", handleCursorMove);

    ref.addEventListener("mousedown", handleDrawActivation);

    ref.addEventListener("mouseup", handleDrawFinish);

    ref.addEventListener("mouseout", handleCursorOut);

    ref.addEventListener("touchstart", handleDrawActivation); //Here
    ref.addEventListener("touchend", handleDrawFinish);
    ref.addEventListener("touchmove", handleCursorMove);
    ref.addEventListener("touchcancel", handleDrawFinish);

    return () => {
      window.removeEventListener("resize", adjustCanvasParams);
      ref.removeEventListener("mousemove", handleCursorMove);
      ref.removeEventListener("mousedown", handleDrawActivation);
      ref.removeEventListener("mouseup", handleDrawFinish);
      ref.removeEventListener("mouseout", handleCursorOut);
      ref.removeEventListener("touchstart", handleDrawActivation);
      ref.removeEventListener("touchend", handleDrawFinish);
      ref.removeEventListener("touchmove", handleCursorMove);
      ref.removeEventListener("touchcancel", handleDrawFinish);
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
    toolsRef,
  };
};

export { usePaintInitialisation };
