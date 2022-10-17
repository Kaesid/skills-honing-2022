import { ToolNames } from "./SideMenu/constants";
import { Tool } from "./tools/Tool";

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
}

type ICanvasRef = Pick<ICanvasParamsList, "canvasRef">;

type ICtxRef = Pick<ICanvasParamsList, "ctxRef">;

type IPosition = Pick<ICanvasParamsList, "position">;

type IResizeProps = ICanvasRef & ICtxRef & Pick<ICanvasParamsList, "canvasParams" | "savedCanvasDataRef">;

type ISaveCanvasProps = ICanvasRef & ICtxRef;

type ITool = ICtxRef & IPosition & Pick<ICanvasParamsList, "colorRef" | "savedCanvasDataRef">;

type IColorPicker = Pick<ICanvasParamsList, "colorRef">;

type ITouchPosiitionGet = IPosition & { e: IPaintEvent };

// type IToolsList = {
//   [key in ToolNames]: Tool;
// };

type IToolsList = Record<ToolNames, Tool>;

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
};
