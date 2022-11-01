import { useEffect, useRef, useState } from "react";
import { IResizeProps } from "../interface";
import { getCanvasParamsValues } from "./helpers";

const useCanvasResize = (props: IResizeProps) => {
  const { ctxRef, canvasRef, fillEmptyCanvas, canvasStatesRef, resetCanvas } = props;

  const timeout: { current: NodeJS.Timeout | null } = useRef(null);
  const isInitialRender = useRef(true);
  const [{ width, height }, setCanvasParams] = useState(getCanvasParamsValues(canvasRef.current));

  const adjustCanvasParams = () => setCanvasParams(getCanvasParamsValues(canvasRef.current));

  useEffect(() => {
    if (!width || !height) return;
    fillEmptyCanvas();

    if (isInitialRender.current) {
      isInitialRender.current = false;
      resetCanvas();
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
    console.log(canvasStatesRef.current);
    if (
      !canvasStatesRef.current ||
      !canvasStatesRef.current.data[canvasStatesRef.current.position] ||
      !ctxRef.current ||
      !canvasRef.current
    )
      return;
    console.log("redrawCanvasWithScale");

    const { data, position } = canvasStatesRef.current;
    const currentData = data[position];
    const tempCanvas = document.createElement("canvas");
    console.log(currentData.width);
    console.log(currentData.height);
    tempCanvas.width = currentData.width;
    tempCanvas.height = currentData.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(currentData, 0, 0);
    ctxRef.current.save();
    ctxRef.current.scale(width / currentData.width, height / currentData.height);
    ctxRef.current.drawImage(tempCanvas, 0, 0);
    ctxRef.current.restore();
  };

  return { adjustCanvasParams, width, height, redrawCanvasWithScale };
};

export { useCanvasResize };
