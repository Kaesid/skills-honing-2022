import { useState, useRef } from "react";
const useSaveCanvas = (props: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}) => {
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
