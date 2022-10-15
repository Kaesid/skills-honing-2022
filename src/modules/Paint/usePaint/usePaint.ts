import { IPaintEvent } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Tool } from "../tools/Tool";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";

const usePaint = () => {
  const handleDraw = () => {
    if (!ctxRef.current || !toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDraw();
  };

  const handleCursorMove = (e: IPaintEvent) => {
    if (!canvasRef.current) return;
    if (e instanceof TouchEvent) setTouchPosition(e);
    if (e instanceof MouseEvent) position.current = { x: e.offsetX, y: e.offsetY };

    if (isDrawing.current) handleDraw();
  };

  const setTouchPosition = (e: TouchEvent) => {
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    position.current = { x, y };
  };

  const handleDrawActivation = (e: IPaintEvent) => {
    if (!ctxRef.current || !toolsRef.current) return;
    isDrawing.current = true;
    if (e instanceof TouchEvent) setTouchPosition(e);

    toolsRef.current[toolRef.current].handleDrawActivation();
  };

  const saveCanvasData = () => {
    if (!canvasParams.current.width || !canvasParams.current.height || !ctxRef.current) return;

    savedCanvasDataRef.current = ctxRef.current.getImageData(
      0,
      0,
      canvasParams.current.width,
      canvasParams.current.height
    );
  };

  const handleDrawFinish = () => {
    if (!ctxRef.current || !toolsRef.current) return;

    isDrawing.current = false;
    saveCanvasData();

    toolsRef.current[toolRef.current].handleDrawFinish();
  };

  const handleCursorOut = () => {
    isDrawing.current = false;
  };

  const {
    width,
    height,
    colorRef,
    canvasRef,
    ctxRef,
    position,
    isDrawing,
    resetCanvas,
    toolRef,
    canvasParams,
    savedCanvasDataRef,
    toolsRef,
  } = usePaintInitialisation({
    handleDrawActivation,
    handleDrawFinish,
    handleCursorOut,
    handleCursorMove,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
