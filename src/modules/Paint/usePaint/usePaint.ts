import { IPaintEvent } from "../interface";
import { setTouchEventPosition } from "./helpers";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";

const usePaint = () => {
  const handleCursorMove = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    setTouchEventPosition({ e, position });
    if (e instanceof MouseEvent) [position.current.x, position.current.y] = [e.offsetX, e.offsetY];

    if (isDrawing.current) toolsRef.current[toolRef.current].handleDraw();
  };

  const handleDrawActivation = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    isDrawing.current = true;
    setTouchEventPosition({ e, position });
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
