import { IUndoRedo } from "../interface";

const useUndoRedo = (props: IUndoRedo) => {
  const { canvasStatesRef, ctxRef, changePosiiton, redrawCanvasWithScale } = props;

  const undo = () => {
    if (!ctxRef.current || !canvasStatesRef.current.data.length) return;

    if (!canvasStatesRef.current.data[canvasStatesRef.current.position - 1]) {
      console.log("undo --nope");
      return;
    }

    canvasStatesRef.current.position -= 1;
    changePosiiton(canvasStatesRef.current.position);
    redrawCanvasWithScale();
  };

  const redo = () => {
    if (!ctxRef.current || !canvasStatesRef.current.data.length) return;
    if (!canvasStatesRef.current.data[canvasStatesRef.current.position + 1]) {
      console.log("redo --nope");
      return;
    }
    canvasStatesRef.current.position += 1;
    changePosiiton(canvasStatesRef.current.position);
    redrawCanvasWithScale();
  };

  return { undo, redo };
};

export { useUndoRedo };
