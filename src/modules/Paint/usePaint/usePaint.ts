import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getPaintState, setCanvasState } from "../paintSlice";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useAppDispatch } from "./../../../redux/hooks";
import { Controller } from "../tools/Controller";
import { ICanvasStates } from "../interface";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();

  const { colorsPalette, toolName, canvasState } = paintState;

  const savedCanvasDataRef = useRef<ImageData | null>(canvasState);
  const canvasStates = useRef<ICanvasStates>({
    data: savedCanvasDataRef.current ? [savedCanvasDataRef.current] : [],
    position: -1,
  });
  const saveCanvasState = () => dispatch(setCanvasState(savedCanvasDataRef.current));
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette.BLACK);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
    canvasStates,
  });
  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  const undo = () => {
    console.log(1);
    if (!ctxRef.current || !canvasStates.current.data.length) return;
    console.log(canvasStates.current);
    console.log(canvasStates.current.data[canvasStates.current.position]);
    if (!canvasStates.current.data[canvasStates.current.position - 1]) {
      console.log("undo --nope");
      resetCanvas();
      return;
    }
    ctxRef.current.putImageData(canvasStates.current.data[canvasStates.current.position - 1], 0, 0);
    canvasStates.current.position -= 1;
    console.log(canvasStates.current);
    // canvasStates.current.data
  };
  const redo = () => {
    console.log(1);
    if (!ctxRef.current || !canvasStates.current.data.length) return;
    console.log(canvasStates.current);
    console.log(canvasStates.current.data[canvasStates.current.position + 1]);
    if (!canvasStates.current.data[canvasStates.current.position + 1]) {
      console.log("redo --nope");
      return;
    }
    ctxRef.current.putImageData(canvasStates.current.data[canvasStates.current.position + 1], 0, 0);
    canvasStates.current.position += 1;
    // canvasStates.current.data
    console.log(canvasStates.current);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
    adjustCanvasParams();
    const ToolsController = new Controller({ canvasRef, ctxRef, colorRef, savedCanvasDataRef, toolRef, canvasStates });
    ToolsController.setListeners();
    window.addEventListener("resize", adjustCanvasParams);

    return () => {
      saveCanvasState();
      ToolsController.removeListeners();
      window.removeEventListener("resize", adjustCanvasParams);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef, undo, redo };
};

export { usePaint };
