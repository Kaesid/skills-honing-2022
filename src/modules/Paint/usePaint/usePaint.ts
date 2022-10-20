import { useEffect } from "react";
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getPaintState, setCanvasState } from "../paintSlice";
import { useCanvasResize } from "./useCanvasResize";
import { useSaveCanvas } from "./useSaveCanvas";
import { useAppDispatch } from "./../../../redux/hooks";
import { Controller } from "../tools/Controller";

const usePaint = () => {
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();

  const { colorsPalette, toolName, canvasState } = paintState;

  const savedCanvasDataRef = useRef<ImageData | null>(canvasState);
  const saveCanvasState = () => dispatch(setCanvasState(savedCanvasDataRef.current));
  const toolRef = useRef(toolName);
  const colorRef = useRef(colorsPalette.BLACK);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { adjustCanvasParams, width, height, resetCanvas } = useCanvasResize({
    ctxRef,
    canvasRef,
    savedCanvasDataRef,
  });
  const { dataUrl, saveCanvas } = useSaveCanvas({ canvasRef, ctxRef });

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
    adjustCanvasParams();
    const props = { canvasRef, ctxRef, colorRef, savedCanvasDataRef, toolRef };
    const ToolsController = new Controller(props);
    ToolsController.setListeners();
    window.addEventListener("resize", adjustCanvasParams);

    return () => {
      saveCanvasState();
      ToolsController.removeListeners();
      window.removeEventListener("resize", adjustCanvasParams);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, width, height, colorRef, saveCanvas, dataUrl, resetCanvas, toolRef };
};

export { usePaint };
