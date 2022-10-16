import { IPaintEvent } from "../interface";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";

const usePaint = () => {
  const handleCursorMove = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    if (window.TouchEvent && e instanceof TouchEvent) setTouchPosition(e);
    if (e instanceof MouseEvent) [position.current.x, position.current.y] = [e.offsetX, e.offsetY];

    if (isDrawing.current) toolsRef.current[toolRef.current].handleDraw();
  };

  const setTouchPosition = (e: TouchEvent) => {
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    [position.current.x, position.current.y] = [x, y];
  };

  const handleDrawActivation = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    isDrawing.current = true;
    if (window.TouchEvent && e instanceof TouchEvent) setTouchPosition(e);

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
    if (!toolsRef.current) return;

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
