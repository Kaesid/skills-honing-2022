import { useState } from "react";
import { ISaveCanvasProps } from "../interface";

const useSaveCanvas = (props: ISaveCanvasProps) => {
  const { canvasRef, ctxRef } = props;
  const [dataUrl, setDataUrl] = useState("#");

  const saveCanvas = () => {
    if (!canvasRef.current || !ctxRef.current) return;
    ctxRef.current.save();
    setDataUrl(canvasRef.current.toDataURL("image/png"));
  };

  return { saveCanvas, dataUrl };
};

export { useSaveCanvas };
