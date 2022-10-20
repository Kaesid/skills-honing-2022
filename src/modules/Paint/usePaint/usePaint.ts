import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { IPaintEvent, IToolsList } from "../interface";
import { getColorPalette, getPaintState, setCanvasState } from "../paintSlice";
import { ToolNames } from "../SideMenu/constants";
import { Brush } from "../tools/Brush";
import { Circle } from "../tools/Circle";
import { Eraser } from "../tools/Eraser";
import { Line } from "../tools/Line";
import { Pencil } from "../tools/Pencil";
import { Rectangle } from "../tools/Rectangle";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useAppDispatch } from "./../../../redux/hooks";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();

  const { colorsPalette, toolName, canvasState } = paintState;

  const savedCanvasDataRef = useRef<ImageData | null>(canvasState);
  const saveCanvasState = () => dispatch(setCanvasState(savedCanvasDataRef.current));
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette.BLACK);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const toolsRef = useRef<IToolsList | null>(null);

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
  });
  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  useEffect(() => {
    if (!canvasRef.current) return;
    const ref = canvasRef.current;
    ctxRef.current = ref.getContext("2d", { willReadFrequently: true });
    adjustCanvasParams();
    const props = { canvasRef, ctxRef, colorRef, savedCanvasDataRef };
    toolsRef.current = {
      [ToolNames.PENCIL]: new Pencil(props),
      [ToolNames.ERASER]: new Eraser(props),
      [ToolNames.BRUSH]: new Brush(props),
      [ToolNames.LINE]: new Line(props),
      [ToolNames.RECTANGLE]: new Rectangle(props),
      [ToolNames.CIRCLE]: new Circle(props),
    };
    const handleCursorMove = (e: IPaintEvent) => {
      if (toolsRef.current) toolsRef.current[toolRef.current].handleCursorMove(e);
    };

    const handleDrawActivation = (e: IPaintEvent) => {
      if (toolsRef.current) toolsRef.current[toolRef.current].handleDrawActivation(e);
    };

    const handleDrawFinish = () => {
      if (toolsRef.current) toolsRef.current[toolRef.current].handleDrawFinish();
    };

    const handleCursorOut = () => {
      if (toolsRef.current) toolsRef.current[toolRef.current].handleDrawFinish();
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
      saveCanvasState();
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

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
