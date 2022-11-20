import { ToolNames } from "./SideMenu/constants";
import { Tool } from "./tools/Tool";
import { DefaultColors } from "./constants";

type IPaintEvent = TouchEvent | MouseEvent;

interface ISizeParams {
  width: number;
  height: number;
}

interface ICoordinates {
  x: number;
  y: number;
}

interface ICanvasParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  canvasParams: React.MutableRefObject<ISizeParams>;
  colorRef: React.MutableRefObject<string>;
  toolRef: React.MutableRefObject<ToolNames>;
  position: React.MutableRefObject<ICoordinates>;
  canvasStatesRef: React.MutableRefObject<ICanvasStates>;
}

interface ICanvasMethods {
  fillEmptyCanvas: () => void;
  resetSavedCanvasState: () => void;
  undo: () => void;
  redo: () => void;
  changePosiiton: (newPosition: number) => void;
  redrawCanvasWithScale: () => void;
}

type IResizeProps = Pick<ICanvasParams, "canvasRef" | "ctxRef" | "canvasStatesRef"> &
  Pick<ICanvasMethods, "fillEmptyCanvas" | "resetSavedCanvasState">;

type ISaveCanvasProps = Pick<ICanvasParams, "canvasRef" | "ctxRef">;

type ITool = Omit<ICanvasParams, "position" | "canvasParams"> & Pick<ICanvasMethods, "changePosiiton">;

type IUndoRedo = Pick<ICanvasParams, "ctxRef" | "canvasStatesRef"> &
  Pick<ICanvasMethods, "changePosiiton" | "redrawCanvasWithScale">;

type ITouchPosiitionGet = Pick<ICanvasParams, "position"> & { e: IPaintEvent };

type IToolsList = Record<ToolNames, Tool>;

type IColorsPalette = typeof DefaultColors;

type IColorsName = keyof IColorsPalette;

interface IPaletteSlot {
  readonly color: string;
  readonly isSelected: boolean;
}

interface ICanvasStates {
  data: ImageData[];
  position: number;
}

export type {
  ICoordinates,
  ISizeParams,
  ICanvasParams,
  ICanvasMethods,
  IResizeProps,
  ISaveCanvasProps,
  IPaintEvent,
  ITool,
  IToolsList,
  ITouchPosiitionGet,
  IUndoRedo,
  IColorsName,
  IPaletteSlot,
  IColorsPalette,
  ICanvasStates,
};
