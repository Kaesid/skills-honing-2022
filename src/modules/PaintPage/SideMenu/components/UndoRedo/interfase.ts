import { ICanvasMethods, ICanvasParams } from "../../../interface";

type UndoRedoViewProps = Pick<ICanvasParams, "canvasStatesRef"> & Pick<ICanvasMethods, "undo" | "redo">;

export type { UndoRedoViewProps };
