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

    // setTimeout(() => {
    //   if (!canvasRef.current || !ctxRef.current) return;

    //   console.log(ctxRef.current);
    //   ctxRef.current.restore();

    //   ctxRef.current.fillStyle = "green";
    //   ctxRef.current.fillRect(10, 10, 100, 100);
    // }, 3000);
  };

  return { saveCanvas, dataUrl };
};

export { useSaveCanvas };
