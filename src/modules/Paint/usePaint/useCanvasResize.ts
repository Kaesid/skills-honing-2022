import { useEffect, useRef, useState } from "react";
interface Props {
  canvasParams: React.MutableRefObject<{
    width: number;
    height: number;
  }>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  tempData: React.MutableRefObject<ImageData | null>;
  //   setCanvasParams: React.Dispatch<
  //     React.SetStateAction<{
  //       width: number;
  //       height: number;
  //     }>
  //   >;
  //   width: number;
  //   height: number;
}

const useCanvasResize = (props: Props) => {
  const { canvasParams, ctxRef, canvasRef, tempData } = props;
  const setCanvasParamsValues = (ref: HTMLCanvasElement | null) => {
    // const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const ratio = 1;
    const params = ref ? { width: ref.clientWidth * ratio, height: ref.clientHeight * ratio } : { width: 0, height: 0 };
    canvasParams.current = params;

    return params;
  };
  const [{ width, height }, setCanvasParams] = useState(setCanvasParamsValues(canvasRef.current));
  const timeout: { current: NodeJS.Timeout | null } = useRef(null);

  const fillEmptyCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;

    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
  };

  const adjustCanvasParams = () => {
    setCanvasParams(setCanvasParamsValues(canvasRef.current));
  };

  useEffect(() => {
    if (!width || !height || !ctxRef.current || !canvasRef.current) return;
    fillEmptyCanvas();
    resizeSavedCanvas();
  }, [width, height]);

  const resizeSavedCanvas = () => {
    if (
      !ctxRef.current ||
      !canvasRef.current ||
      !tempData.current ||
      (tempData.current.width === width && tempData.current.height === height)
    )
      return;

    if (timeout.current) clearTimeout(timeout.current);
    ctxRef.current.save();
    timeout.current = setTimeout(() => {
      if (!tempData.current || !ctxRef.current || !canvasRef.current) return;
      const canvas = document.createElement("canvas");
      canvas.width = tempData.current.width;
      canvas.height = tempData.current.height;
      const ctx1 = canvas.getContext("2d");
      if (!ctx1) return;
      ctx1.putImageData(tempData.current, 0, 0);
      const newWidth = canvasRef.current.clientWidth;
      const newheight = canvasRef.current.clientHeight;
      const oldWidth = tempData.current.width;
      const oldHeight = tempData.current.height;
      console.log("width", oldWidth, newWidth);
      console.log("height", oldHeight, newheight);

      ctxRef.current.scale(newWidth / oldWidth, newheight / oldHeight);
      ctxRef.current.drawImage(canvas, 0, 0);
      ctxRef.current?.restore();
    }, 200);
  };

  return { adjustCanvasParams, width, height };
};

export { useCanvasResize };
