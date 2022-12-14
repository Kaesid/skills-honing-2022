import { useEffect, useRef, useState } from "react";
import { IResizeProps } from "../interface";
import { getCanvasParamsValues } from "./helpers";

const useCanvasResize = (props: IResizeProps) => {
  const { ctxRef, canvasRef, fillEmptyCanvas, canvasStatesRef, resetSavedCanvasState } = props;

  const timeout: { current: NodeJS.Timeout | null } = useRef(null);
  const isInitialRender = useRef(true);
  const [{ width, height }, setCanvasParams] = useState(getCanvasParamsValues(canvasRef.current));

  const setCanvasSizeValues = () => setCanvasParams(getCanvasParamsValues(canvasRef.current));

  useEffect(() => {
    if (!width || !height) return;
    fillEmptyCanvas();

    if (isInitialRender.current) {
      isInitialRender.current = false;
      if (!canvasStatesRef.current.data.length) {
        resetSavedCanvasState();
      }
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
    if (!canvasStatesRef.current || !canvasStatesRef.current.data[canvasStatesRef.current.position] || !ctxRef.current)
      return;

    const { data, position } = canvasStatesRef.current;
    const currentData = data[position];
    const tempCanvas = document.createElement("canvas");
    [tempCanvas.width, tempCanvas.height] = [currentData.width, currentData.height];
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(currentData, 0, 0);
    ctxRef.current.save();
    ctxRef.current.scale(width / currentData.width, height / currentData.height);
    ctxRef.current.drawImage(tempCanvas, 0, 0);
    ctxRef.current.restore();
  };

  return { setCanvasSizeValues, width, height, redrawCanvasWithScale };
};

export { useCanvasResize };
