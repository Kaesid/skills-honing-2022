import { useEffect, useRef, useState } from "react";
import { IResizeProps } from "../interface";

const useCanvasResize = (props: IResizeProps) => {
  const { ctxRef, canvasRef, savedCanvasDataRef } = props;
  const getCanvasParamsValues = () => {
    // const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const ratio = 1;
    const params = canvasRef.current
      ? { width: canvasRef.current.clientWidth * ratio, height: canvasRef.current.clientHeight * ratio }
      : { width: 0, height: 0 };
    return params;
  };
  const [{ width, height }, setCanvasParams] = useState(getCanvasParamsValues());
  const timeout: { current: NodeJS.Timeout | null } = useRef(null);

  const fillEmptyCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, width, height);
  };

  const resetCanvas = () => {
    fillEmptyCanvas();
    savedCanvasDataRef.current = null;
  };

  const adjustCanvasParams = () => {
    setCanvasParams(getCanvasParamsValues());
  };

  useEffect(() => {
    if (!width || !height || !ctxRef.current || !canvasRef.current) return;

    fillEmptyCanvas();
    resizeSavedCanvas();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const resizeSavedCanvas = () => {
    if (!ctxRef.current || !canvasRef.current || !savedCanvasDataRef.current) return;

    if (timeout.current) clearTimeout(timeout.current);
    ctxRef.current.save();
    timeout.current = setTimeout(() => {
      if (!savedCanvasDataRef.current || !ctxRef.current || !canvasRef.current) return;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = savedCanvasDataRef.current.width;
      tempCanvas.height = savedCanvasDataRef.current.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      tempCtx.putImageData(savedCanvasDataRef.current, 0, 0);
      ctxRef.current.scale(width / savedCanvasDataRef.current.width, height / savedCanvasDataRef.current.height);
      ctxRef.current.drawImage(tempCanvas, 0, 0);
      ctxRef.current.restore();
    }, 200);
  };

  return { adjustCanvasParams, width, height, resetCanvas };
};

export { useCanvasResize };
