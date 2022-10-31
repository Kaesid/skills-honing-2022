import { ToolNames } from "./SideMenu/constants";
import { Tool } from "./tools/Tool";
import { DefaultColors } from "./constants";

type IPaintEvent = TouchEvent | MouseEvent;

interface IHandlers {
  handleDrawActivation: (e: IPaintEvent) => void;
  handleDrawFinish: () => void;
  handleCursorOut: () => void;
  handleCursorMove: (e: IPaintEvent) => void;
}

interface ISizeParams {
  width: number;
  height: number;
}

interface ICoordinates {
  x: number;
  y: number;
}
interface ICanvasParamsList {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  canvasParams: React.MutableRefObject<ISizeParams>;
  savedCanvasDataRef: React.MutableRefObject<ImageData | null>;
  colorRef: React.MutableRefObject<string>;
  toolRef: React.MutableRefObject<ToolNames>;
  position: React.MutableRefObject<ICoordinates>;
  canvasStatesRef: React.MutableRefObject<ICanvasStates>;
  fillEmptyCanvas: () => void;
  undo: () => void;
  redo: () => void;
  changePosiiton: (newPosition: number) => void;
}

type ICanvasRef = Pick<ICanvasParamsList, "canvasRef">;

type ICtxRef = Pick<ICanvasParamsList, "ctxRef">;

type IPosition = Pick<ICanvasParamsList, "position">;

type IResizeProps = ICanvasRef &
  ICtxRef &
  Pick<ICanvasParamsList, "savedCanvasDataRef" | "canvasStatesRef" | "fillEmptyCanvas">;

type ISaveCanvasProps = ICanvasRef & ICtxRef;

type ITool = ICanvasRef &
  ICtxRef &
  Pick<ICanvasParamsList, "colorRef" | "savedCanvasDataRef" | "toolRef" | "canvasStatesRef" | "changePosiiton">;

type IUndoRedo = ICanvasRef &
  ICtxRef &
  Pick<ICanvasParamsList, "savedCanvasDataRef" | "canvasStatesRef" | "changePosiiton">;

type IColorPicker = Pick<ICanvasParamsList, "colorRef">;

type ITouchPosiitionGet = IPosition & { e: IPaintEvent };

// type IToolsList = {
//   [key in ToolNames]: Tool;
// };

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
  IHandlers,
  ICoordinates,
  ISizeParams,
  ICanvasParamsList,
  IResizeProps,
  ISaveCanvasProps,
  IPaintEvent,
  ITool,
  IToolsList,
  IColorPicker,
  ICanvasRef,
  ITouchPosiitionGet,
  IUndoRedo,
  IColorsName,
  IPaletteSlot,
  IColorsPalette,
  ICanvasStates,
};
