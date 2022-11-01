import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { changeSavedStatePosition, getPaintState, setCanvasStates } from "../paintSlice";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useAppDispatch } from "./../../../redux/hooks";
import { Controller } from "../tools/Controller";
import { ICanvasStates } from "../interface";
import { useUndoRedo } from "./useUndoRedo";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();
  //TODO:refactor
  const { colorsPalette, toolName, canvasStates } = paintState;
  const saveCanvasStates = () => dispatch(setCanvasStates(canvasStatesRef.current));
  const changePosiiton = (newPosition: number) => dispatch(changeSavedStatePosition(newPosition));

  const savedCanvasDataRef = useRef<ImageData | null>(
    canvasStates.data[canvasStates.position] ? canvasStates.data[canvasStates.position] : null
  );
  const canvasStatesRef = useRef<ICanvasStates>({ ...canvasStates, data: [...canvasStates.data] });
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette.BLACK);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const fillEmptyCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, width, height);
  };

  const resetCanvas = () => {
    fillEmptyCanvas();
    resetSavedCanvasState();
  };

  const { adjustCanvasParams, width, height, redrawCanvasWithScale } = useCanvasResize({
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
    canvasStatesRef,
    fillEmptyCanvas,
    resetCanvas,
  });

  const { resetSavedCanvasState, undo, redo } = useUndoRedo({
    canvasRef,
    savedCanvasDataRef,
    canvasStatesRef,
    ctxRef,
    changePosiiton,
    redrawCanvasWithScale,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

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
      changePosiiton,
    });
    ToolsController.setListeners();
    window.addEventListener("resize", adjustCanvasParams);
    // setTimeout(() => {
    // }, 500);

    return () => {
      saveCanvasStates();
      ToolsController.removeListeners();
      window.removeEventListener("resize", adjustCanvasParams);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef, undo, redo, canvasStatesRef };
};

export { usePaint };
