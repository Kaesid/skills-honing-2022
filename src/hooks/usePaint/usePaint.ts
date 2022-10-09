import { ToolNames } from "../../modules/Paint/SideMenu/constants";
import { usePaintInitialisation } from "./usePaintInitialisation";
import { useSaveCanvas } from "./useSaveCanvas";
import { useRef, useCallback } from "react";

// interface IPainting {
//   toolName: string;
// }

const usePaint = () => {
  const tempData = useRef<ImageData | null>(null);
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

  const handleMouseDown = () => {
    if (!ctxRef.current) return;
    isDrawing.current = true;
    const { x, y } = position.current;
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
          ctxRef.current.putImageData(tempData.current, 0, 0);
        }
        break;
      default:
    }
  };

  const handleMouseUp = () => {
    if (!ctxRef.current) return;
    isDrawing.current = false;
    const { x, y } = position.current;
    // if (tempData.current) {
    //   console.log(tempData.current);
    //   // ctxRef.current.putImageData(tempData.current, x, y, y, y, width, height);
    //   ctxRef.current.putImageData(tempData.current, 0, 0);
    // }

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

  const { width, height, colorRef, canvasRef, ctxRef, position, isDrawing, resetCanvas, toolRef, canvasParams } =
    usePaintInitialisation({
      handleDraw,
      handleMouseDown,
      handleMouseUp,
      handleMouseOut,
    });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
