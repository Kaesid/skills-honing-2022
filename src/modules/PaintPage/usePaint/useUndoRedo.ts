import { IUndoRedo } from "../interface";

const useUndoRedo = (props: IUndoRedo) => {
  const { canvasStatesRef, ctxRef, changePosiiton, redrawCanvasWithScale } = props;

  const changeSavedState = (modifier: number) => {
    if (
      !ctxRef.current ||
      !canvasStatesRef.current.data.length ||
      !canvasStatesRef.current.data[canvasStatesRef.current.position + modifier]
    )
      return;

    canvasStatesRef.current.position += modifier;
    changePosiiton(canvasStatesRef.current.position);
    redrawCanvasWithScale();
  };

  const undo = () => changeSavedState(-1);

  const redo = () => changeSavedState(1);

  return { undo, redo };
};

export { useUndoRedo };
