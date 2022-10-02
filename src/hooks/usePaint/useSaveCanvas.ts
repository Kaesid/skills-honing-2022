import { useState } from "react";
const useSaveCanvas = (props: { canvasRef: React.RefObject<HTMLCanvasElement> }) => {
  const { canvasRef } = props;
  const [dataUrl, setDataUrl] = useState("#");

  const saveCanvas = () => {
    if (!canvasRef.current) return;

    setDataUrl(canvasRef.current.toDataURL("image/png"));
  };

  return { saveCanvas, dataUrl };
};

export { useSaveCanvas };
