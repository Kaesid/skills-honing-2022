import { IUndoRedo } from "../interface";

const useUndoRedo = (props: IUndoRedo) => {
  const { savedCanvasDataRef, canvasStatesRef, ctxRef, canvasRef, changePosiiton, redrawCanvasWithScale } = props;

  const resetSavedCanvasState = () => {
    savedCanvasDataRef.current = null;
    if (ctxRef.current && canvasRef.current) {
      console.log(canvasRef.current.clientWidth);
      console.log(canvasRef.current.clientHeight);
      canvasStatesRef.current.data = [
        ctxRef.current.getImageData(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight),
      ];
    }
    canvasStatesRef.current.position = 0;
    changePosiiton(canvasStatesRef.current.position);
  };

  const undo = () => {
    console.log(1);
    if (!ctxRef.current || !canvasStatesRef.current.data.length) return;
    console.log(canvasStatesRef.current);
    console.log(canvasStatesRef.current.data[canvasStatesRef.current.position]);
    if (!canvasStatesRef.current.data[canvasStatesRef.current.position - 1]) {
      console.log("undo --nope");
      return;
    }

    canvasStatesRef.current.position -= 1;
    changePosiiton(canvasStatesRef.current.position);
    // ctxRef.current.putImageData(canvasStatesRef.current.data[canvasStatesRef.current.position], 0, 0);
    redrawCanvasWithScale();
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
    canvasStatesRef.current.position += 1;
    changePosiiton(canvasStatesRef.current.position);
    // ctxRef.current.putImageData(canvasStatesRef.current.data[canvasStatesRef.current.position], 0, 0);
    redrawCanvasWithScale();
    console.log(canvasStatesRef.current);
  };

  return { undo, redo, resetSavedCanvasState };
};

export { useUndoRedo };
