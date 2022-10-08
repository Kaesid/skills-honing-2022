import { useRef, useEffect, useState } from "react";
// import { getPaintColor, setPaintColor } from "../../modules/Paint/paintSlice";
// import { useAppSelector } from "../../redux/hooks";

import { IDraw } from "../../modules/Paint/Canvas/Canvas";
import { ToolNames } from "../../modules/Paint/SideMenu/constants";
import { usePaintInitialisation } from "./usePaintInitialisation";
// import { useAppDispatch } from "../../redux/hooks";
import { useSaveCanvas } from "./useSaveCanvas";

interface IPainting {
  toolName: string;
}

const usePaint = () => {
  // const { toolName } = props;
  // const dispatch = useAppDispatch();
  // const color = useAppSelector(getPaintColor);
  // const colorRef = useRef("#aabbcc");
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
        ctxRef.current.arc(x, y, 3, 0, Math.PI * 3);
        ctxRef.current.fill();
        break;
      case ToolNames.BRUSH:
        break;
      default:
    }
    // ctxRef.current.fillStyle = colorRef.current;

    // ctx.beginPath();
    // ctx.arc(x, y, 3, 0, Math.PI * 3);
    // ctx.fill();
  };

  const handleMouseDown = () => {
    if (!ctxRef.current) return;
    isDrawing.current = true;

    switch (toolRef.current) {
      case ToolNames.PENCIL:
        ctxRef.current.beginPath();
        ctxRef.current.lineTo(position.current.x, position.current.y);
        break;
      case ToolNames.ERASER:
        break;
      case ToolNames.BRUSH:
        break;
      default:
    }
  };

  const handleMouseUp = () => {
    if (!ctxRef.current) return;
    isDrawing.current = false;

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

  const { width, height, colorRef, canvasRef, ctxRef, position, isDrawing, resetCanvas, toolRef } =
    usePaintInitialisation({
      handleDraw,
      handleMouseDown,
      handleMouseUp,
      handleMouseOut,
    });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
