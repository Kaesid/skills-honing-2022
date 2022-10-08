import { useRef, useEffect, useState } from "react";
// import { getPaintColor, setPaintColor } from "../../modules/Paint/paintSlice";
// import { useAppSelector } from "../../redux/hooks";

import { IDraw } from "../../modules/Paint/Canvas/Canvas";
import { usePaintInitialisation } from "./usePaintInitialisation";
// import { useAppDispatch } from "../../redux/hooks";
import { useSaveCanvas } from "./useSaveCanvas";

interface IPainting {
  toolName: string;
}

const usePaint = (props: IPainting) => {
  // const dispatch = useAppDispatch();
  // const color = useAppSelector(getPaintColor);
  // const colorRef = useRef("#aabbcc");
  const handleDraw = () => {
    const { x, y } = position.current;
    if (!ctxRef.current) return;
    ctxRef.current.fillStyle = colorRef.current;
    ctxRef.current.strokeStyle = colorRef.current;
    // ctx.beginPath();
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    // ctx.arc(x, y, 3, 0, Math.PI * 3);
    // ctx.fill();
  };

  const handleMouseDown = () => {
    if (!ctxRef.current) return;
    isDrawing.current = true;
    ctxRef.current.beginPath();
    ctxRef.current.lineTo(position.current.x, position.current.y);
  };

  const handleMouseUp = () => {
    if (!ctxRef.current) return;
    isDrawing.current = false;
    ctxRef.current.closePath();
  };

  const handleMouseOut = () => {
    isDrawing.current = false;
  };

  const { width, height, colorRef, canvasRef, ctxRef, position, isDrawing, resetCanvas } = usePaintInitialisation({
    handleDraw,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
  });
  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef });

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas };
};

export { usePaint };
