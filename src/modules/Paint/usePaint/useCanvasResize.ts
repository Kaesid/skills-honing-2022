import { useEffect, useRef, useState } from "react";
import { IResizeProps } from "../interface";

const useCanvasResize = (props: IResizeProps) => {
  const { ctxRef, canvasRef, savedCanvasDataRef, canvasStates } = props;
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
  const isInitialRender = useRef(true);

  const fillEmptyCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, width, height);
  };

  const resetCanvas = () => {
    fillEmptyCanvas();
    savedCanvasDataRef.current = null;
    canvasStates.current.data = [];
    canvasStates.current.position = -1;
  };

  const adjustCanvasParams = () => {
    setCanvasParams(getCanvasParamsValues());
  };

  useEffect(() => {
    if (!width || !height) return;
    fillEmptyCanvas();
    if (isInitialRender.current) {
      isInitialRender.current = false;
      redrawCanvasWithSacle();
    } else {
      redrawSavedCanvasWithDelay();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const redrawSavedCanvasWithDelay = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(redrawCanvasWithSacle, 200);
  };

  const redrawCanvasWithSacle = () => {
    if (!savedCanvasDataRef.current || !ctxRef.current || !canvasRef.current) return;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = savedCanvasDataRef.current.width;
    tempCanvas.height = savedCanvasDataRef.current.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(savedCanvasDataRef.current, 0, 0);
    ctxRef.current.save();
    ctxRef.current.scale(width / savedCanvasDataRef.current.width, height / savedCanvasDataRef.current.height);
    ctxRef.current.drawImage(tempCanvas, 0, 0);
    ctxRef.current.restore();
  };

  return { adjustCanvasParams, width, height, resetCanvas, redrawCanvasWithSacle };
};

export { useCanvasResize };
