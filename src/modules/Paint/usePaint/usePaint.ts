import { IPaintEvent } from "../interface";
import { setTouchEventPosition } from "./helpers";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";

const usePaint = () => {
  const handleCursorMove = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleCursorMove(e);
  };

  const handleDrawActivation = (e: IPaintEvent) => {
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDrawActivation(e);
  };

  const handleDrawFinish = () => {
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDrawFinish();
  };

  const handleCursorOut = () => {
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDrawFinish();
  };

  const { width, height, colorRef, canvasRef, ctxRef, resetCanvas, toolRef, toolsRef } = usePaintInitialisation({
    handleDrawActivation,
    handleDrawFinish,
    handleCursorOut,
    handleCursorMove,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
