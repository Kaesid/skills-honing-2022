import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { changeSavedStatePosition, getPaintState, setCanvasStates, setSessionActive } from "../paintSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useUndoRedo } from "./useUndoRedo";
import { Controller } from "../tools/Controller";
import { ICanvasStates } from "../interface";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();

  const { colorsPalette, toolName, canvasStates, selectedColorSlot } = paintState;
  const saveCanvasStatesToStore = () => dispatch(setCanvasStates(canvasStatesRef.current));
  const setPaintSessionActive = () => dispatch(setSessionActive());
  const changePosiiton = (newPosition: number) => dispatch(changeSavedStatePosition(newPosition));

  const canvasStatesRef = useRef<ICanvasStates>({ ...canvasStates, data: [...canvasStates.data] });
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette[selectedColorSlot]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const fillEmptyCanvas = () => {
    if (!ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, width, height);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, width, height);
  };

  const resetSavedCanvasState = () => {
    if (ctxRef.current && canvasRef.current) {
      canvasStatesRef.current.data = [
        ctxRef.current.getImageData(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight),
      ];
    }
    canvasStatesRef.current.position = 0;
    changePosiiton(canvasStatesRef.current.position);
  };

  const resetCanvas = () => {
    fillEmptyCanvas();
    resetSavedCanvasState();
  };

  const { setCanvasSizeValues, width, height, redrawCanvasWithScale } = useCanvasResize({
    ctxRef,
    canvasRef,
    canvasStatesRef,
    fillEmptyCanvas,
    resetSavedCanvasState,
  });

  const { undo, redo } = useUndoRedo({
    canvasStatesRef,
    ctxRef,
    changePosiiton,
    redrawCanvasWithScale,
  });

  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  useEffect(() => {
    if (!canvasRef.current) return;
    setPaintSessionActive();
    ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
    setCanvasSizeValues();

    const ToolsController = new Controller({
      canvasRef,
      ctxRef,
      colorRef,
      toolRef,
      canvasStatesRef,
      changePosiiton,
    });
    ToolsController.setListeners();
    window.addEventListener("resize", setCanvasSizeValues);

    return () => {
      saveCanvasStatesToStore();
      ToolsController.removeListeners();
      window.removeEventListener("resize", setCanvasSizeValues);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef, undo, redo, canvasStatesRef };
};

export { usePaint };
