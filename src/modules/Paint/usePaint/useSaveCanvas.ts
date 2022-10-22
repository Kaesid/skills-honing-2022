import { useState } from "react";
import { ISaveCanvasProps } from "../interface";

const useSaveCanvas = (props: ISaveCanvasProps) => {
  const { canvasRef } = props;
  const [dataUrl, setDataUrl] = useState("#");

  const saveCanvas = () => {
    if (!canvasRef.current) return;
    setDataUrl(canvasRef.current.toDataURL("image/png"));
  };

  return { saveCanvas, dataUrl };
};

export { useSaveCanvas };
