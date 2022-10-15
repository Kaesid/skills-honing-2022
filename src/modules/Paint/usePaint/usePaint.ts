import { IPaintEvent } from "../interface";
import { ToolNames } from "../SideMenu/constants";
import { Tool } from "../tools/Tool";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";

const usePaint = () => {
  const handleDraw = () => {
    if (!ctxRef.current) return;
    // const { x, y } = position.current;
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDraw();
    // switch (toolRef.current) {
    //   case ToolNames.PENCIL:
    //     // toolsRef.current.handleDraw();
    //     // ctxRef.current.strokeStyle = colorRef.current;
    //     // ctxRef.current.lineTo(x, y);
    //     // ctxRef.current.stroke();
    //     break;
    //   case ToolNames.ERASER:
    //     ctxRef.current.fillStyle = "white";
    //     ctxRef.current.beginPath();
    //     ctxRef.current.arc(x, y, 10, 0, Math.PI * 3);
    //     ctxRef.current.fill();
    //     break;
    //   case ToolNames.BRUSH:
    //     break;
    //   default:
    // }
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
    if (!ctxRef.current) return;
    isDrawing.current = true;
    if (e instanceof TouchEvent) setTouchPosition(e);
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDrawActivation();
    // switch (toolRef.current) {
    //   case ToolNames.PENCIL:
    //     // ctxRef.current.beginPath();
    //     // ctxRef.current.lineTo(position.current.x, position.current.y);
    //     // toolsRef.current.handleDrawActivation();
    //     break;
    //   case ToolNames.ERASER:
    //     if (canvasParams.current.width && canvasParams.current.height) {
    //       savedCanvasDataRef.current = ctxRef.current.getImageData(
    //         0,
    //         0,
    //         canvasParams.current.width,
    //         canvasParams.current.height
    //       );
    //     }
    //     break;
    //   case ToolNames.BRUSH:
    //     break;
    //   default:
    // }
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
    if (!ctxRef.current) return;

    isDrawing.current = false;
    saveCanvasData();
    if (!toolsRef.current) return;
    toolsRef.current[toolRef.current].handleDrawFinish();
    // switch (toolRef.current) {
    //   case ToolNames.PENCIL:
    //     // ctxRef.current.closePath();
    //     toolsRef.current.handleDrawFinish();
    //     break;
    //   case ToolNames.ERASER:
    //     break;
    //   case ToolNames.BRUSH:
    //     break;
    //   default:
    // }
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
