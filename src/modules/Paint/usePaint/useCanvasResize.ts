import { useEffect, useRef, useState } from "react";
import { IResizeProps } from "../interface";
import { getCanvasParamsValues } from "./helpers";

const useCanvasResize = (props: IResizeProps) => {
  const { ctxRef, canvasRef, savedCanvasDataRef, fillEmptyCanvas } = props;

  const timeout: { current: NodeJS.Timeout | null } = useRef(null);
  const isInitialRender = useRef(true);
  const [{ width, height }, setCanvasParams] = useState(getCanvasParamsValues(canvasRef.current));

  const adjustCanvasParams = () => setCanvasParams(getCanvasParamsValues(canvasRef.current));

  useEffect(() => {
    if (!width || !height) return;
    fillEmptyCanvas();

    if (isInitialRender.current) {
      isInitialRender.current = false;
      redrawCanvasWithScale();
    } else {
      redrawSavedCanvasWithDelay();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const redrawSavedCanvasWithDelay = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(redrawCanvasWithScale, 200);
  };

  const redrawCanvasWithScale = () => {
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

  return { adjustCanvasParams, width, height };
};

export { useCanvasResize };
