import { Redo, Undo } from "../../../../../assets/images/svgrepo";
import { useAppSelector } from "../../../../../redux/hooks";
import { ICanvasParamsList } from "../../../interface";
import { CanvasStateIcon, IconsBox } from "../../styled-components";
import { getPaintState } from "../../../paintSlice";

const UndoRedo = ({ undo, redo, canvasStatesRef }: Pick<ICanvasParamsList, "undo" | "redo" | "canvasStatesRef">) => {
  const paintState = useAppSelector(getPaintState);
  const { canvasStates } = paintState;

  return (
    <IconsBox>
      <CanvasStateIcon $isBlocked={!Boolean(canvasStatesRef.current.data[canvasStates.position - 1])} onClick={undo}>
        <Undo />
      </CanvasStateIcon>
      <CanvasStateIcon $isBlocked={!Boolean(canvasStatesRef.current.data[canvasStates.position + 1])} onClick={redo}>
        <Redo />
      </CanvasStateIcon>
    </IconsBox>
  );
};

export default UndoRedo;
