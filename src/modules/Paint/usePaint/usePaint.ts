import { ToolNames } from "../SideMenu/constants";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";
// interface IPainting {
//   toolName: string;
// }

const usePaint = () => {
  const handleDraw = () => {
    if (!ctxRef.current) return;
    const { x, y } = position.current;

    switch (toolRef.current) {
      case ToolNames.PENCIL:
        ctxRef.current.strokeStyle = colorRef.current;
        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
        break;
      case ToolNames.ERASER:
        ctxRef.current.fillStyle = "white";
        ctxRef.current.beginPath();
        ctxRef.current.arc(x, y, 10, 0, Math.PI * 3);
        ctxRef.current.fill();
        break;
      case ToolNames.BRUSH:
        break;
      default:
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    position.current = { x: e.offsetX, y: e.offsetY };

    if (isDrawing.current) handleDraw();
  };

  const setTouchPosition = (e: TouchEvent) => {
    const bcr = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;
    position.current = { x, y };
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchPosition(e);
    if (isDrawing.current) handleDraw();
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (!ctxRef.current) return;
    const ev = e as TouchEvent;
    isDrawing.current = true;
    if (ev.targetTouches) setTouchPosition(ev);

    switch (toolRef.current) {
      case ToolNames.PENCIL:
        ctxRef.current.beginPath();
        ctxRef.current.lineTo(position.current.x, position.current.y);
        break;
      case ToolNames.ERASER:
        if (canvasParams.current.width && canvasParams.current.height) {
          savedCanvasDataRef.current = ctxRef.current.getImageData(
            0,
            0,
            canvasParams.current.width,
            canvasParams.current.height
          );
        }
        break;
      case ToolNames.BRUSH:
        break;
      default:
    }
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

  const handleMouseUp = () => {
    if (!ctxRef.current) return;
    isDrawing.current = false;
    saveCanvasData();

    switch (toolRef.current) {
      case ToolNames.PENCIL:
        ctxRef.current.closePath();
        break;
      case ToolNames.ERASER:
        break;
      case ToolNames.BRUSH:
        break;
      default:
    }
  };

  const handleMouseOut = () => {
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
  } = usePaintInitialisation({
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
    handleMouseMove,
    handleTouchMove,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
