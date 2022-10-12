import { ToolNames } from "../SideMenu/constants";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";
import { useRef, useCallback } from "react";

// interface IPainting {
//   toolName: string;
// }

const usePaint = () => {
  const handleDraw = () => {
    if (!ctxRef.current) return;
    const { x, y } = position.current;
    console.log(x, y);
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

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (!ctxRef.current) return;
    const ev = e as TouchEvent;
    console.log("start");
    isDrawing.current = true;
    if (ev.targetTouches) {
      const bcr = (e.target as HTMLElement).getBoundingClientRect();
      const x = ev.targetTouches[0].clientX - bcr.x;
      const y = ev.targetTouches[0].clientY - bcr.y;
      position.current = { x, y };
    }

    switch (toolRef.current) {
      case ToolNames.PENCIL:
        ctxRef.current.beginPath();
        ctxRef.current.lineTo(position.current.x, position.current.y);
        break;
      case ToolNames.ERASER:
        console.log(canvasParams.current.width);
        if (canvasParams.current.width && canvasParams.current.height) {
          tempData.current = ctxRef.current.getImageData(0, 0, canvasParams.current.width, canvasParams.current.height);
        }
        break;
      case ToolNames.BRUSH:
        if (tempData.current) {
          console.log(tempData.current);
          // ctxRef.current.putImageData(tempData.current, x, y, y, y, width, height);
          // ctxRef.current.putImageData(
          //   tempData.current,
          //   canvasParams.current.width / 2,
          //   canvasParams.current.height / 2
          // );
          // ctxRef.current.putImageData(tempData.current, x, y, x, y, tempData.current.width, tempData.current.height);
          // ctxRef.current.putImageData(tempData.current, tempData.current.width / 2, tempData.current.height / 2);
          // const newCanvas = (
          //   <canvas width={canvasParams.current.width / 2} height={canvasParams.current.height / 2}></canvas>
          // );
          // newCanvas.getContext("2d").putImageData(imageData, 0, 0);

          // ctxRef.current.putImageData(tempData.current, 0, 0);
          const canvas = document.createElement("canvas");
          canvas.width = tempData.current.width;
          canvas.height = tempData.current.height;
          const ctx1 = canvas.getContext("2d");
          if (!ctx1) return;
          ctx1.putImageData(tempData.current, 0, 0);
          // ctx1.scale(canvas.width / tempData.current.width, canvas.height / tempData.current.height);
          // ctx1.drawImage(ibm, 0, 0);
          // const b = ctx1.getImageData(0, 0, canvas.width, canvas.height);
          ctxRef.current.scale(0.5, 0.5);
          ctxRef.current.drawImage(canvas, 0, 0);
        }
        break;
      default:
    }
  };

  const handleMouseUp = () => {
    console.log("end");
    if (!ctxRef.current) return;
    isDrawing.current = false;
    if (canvasParams.current.width && canvasParams.current.height) {
      tempData.current = ctxRef.current.getImageData(0, 0, canvasParams.current.width, canvasParams.current.height);
    }
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
    tempData,
  } = usePaintInitialisation({
    handleDraw,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
