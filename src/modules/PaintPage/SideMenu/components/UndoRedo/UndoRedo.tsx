import { Redo, Undo } from "../../../../../assets/images/svgrepo";
import { useAppSelector } from "../../../../../redux/hooks";
import { getPaintState } from "../../../paintSlice";
import { CanvasStateIcon, IconsBox } from "../../styled-components";
import { UndoRedoViewProps } from "./interfase";

const UndoRedo = (props: UndoRedoViewProps) => {
  const { undo, redo, canvasStatesRef } = props;
  const paintState = useAppSelector(getPaintState);
  const { canvasStates } = paintState;

  return (
    <IconsBox>
      <CanvasStateIcon
        data-testid="undo"
        $isBlocked={!Boolean(canvasStatesRef.current.data[canvasStates.position - 1])}
        onClick={undo}
      >
        <Undo />
      </CanvasStateIcon>
      <CanvasStateIcon $isBlocked={!Boolean(canvasStatesRef.current.data[canvasStates.position + 1])} onClick={redo}>
        <Redo />
      </CanvasStateIcon>
    </IconsBox>
  );
};

export default UndoRedo;
