import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getPaintState, setCanvasState, setCanvasStates } from "../paintSlice";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useAppDispatch } from "./../../../redux/hooks";
import { Controller } from "../tools/Controller";
import { ICanvasStates } from "../interface";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();

  const { colorsPalette, toolName, canvasState, canvasStates } = paintState;

  const savedCanvasDataRef = useRef<ImageData | null>(
    canvasStates.data[canvasStates.position] ? canvasStates.data[canvasStates.position] : null
  );
  const canvasStatesRef = useRef<ICanvasStates>({ ...canvasStates, data: [...canvasStates.data] });
  // const canvasStatesRef = useRef<ICanvasStates>({
  //   data: [],
  //   position: -1,
  // });

  // console.log(JSON.stringify(savedCanvasDataRef.current));
  const saveCanvasState = () => dispatch(setCanvasState(savedCanvasDataRef.current));
  // console.log(canvasStates);
  const saveCanvasStates = () => dispatch(setCanvasStates(canvasStatesRef.current));
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette.BLACK);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
    canvasStatesRef,
  });
  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  const undo = () => {
    console.log(1);
    if (!ctxRef.current || !canvasStatesRef.current.data.length) return;
    console.log(canvasStatesRef.current);
    console.log(canvasStatesRef.current.data[canvasStatesRef.current.position]);
    if (!canvasStatesRef.current.data[canvasStatesRef.current.position - 1]) {
      console.log("undo --nope");
      resetCanvas();
      return;
    }
    ctxRef.current.putImageData(canvasStatesRef.current.data[canvasStatesRef.current.position - 1], 0, 0);
    canvasStatesRef.current.position -= 1;
    console.log(canvasStatesRef.current);
    // canvasStates.current.data
  };
  const redo = () => {
    console.log(1);
    if (!ctxRef.current || !canvasStatesRef.current.data.length) return;
    console.log(canvasStatesRef.current);
    console.log(canvasStatesRef.current.data[canvasStatesRef.current.position + 1]);
    if (!canvasStatesRef.current.data[canvasStatesRef.current.position + 1]) {
      console.log("redo --nope");
      return;
    }
    ctxRef.current.putImageData(canvasStatesRef.current.data[canvasStatesRef.current.position + 1], 0, 0);
    canvasStatesRef.current.position += 1;
    // canvasStates.current.data
    console.log(canvasStatesRef.current);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
    adjustCanvasParams();
    const ToolsController = new Controller({
      canvasRef,
      ctxRef,
      colorRef,
      savedCanvasDataRef,
      toolRef,
      canvasStatesRef,
    });
    ToolsController.setListeners();
    window.addEventListener("resize", adjustCanvasParams);

    return () => {
      // saveCanvasState();
      saveCanvasStates();
      ToolsController.removeListeners();
      window.removeEventListener("resize", adjustCanvasParams);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef, undo, redo };
};

export { usePaint };
