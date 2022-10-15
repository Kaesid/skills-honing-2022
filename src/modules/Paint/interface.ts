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
  toolRef: React.MutableRefObject<string>;
  position: React.MutableRefObject<ICoordinates>;
}

type IResizeProps = Pick<ICanvasParamsList, "canvasRef" | "ctxRef" | "canvasParams" | "savedCanvasDataRef">;

type ISaveCanvasProps = Pick<ICanvasParamsList, "canvasRef" | "ctxRef">;

type ITool = Pick<ICanvasParamsList, "canvasRef" | "ctxRef" | "position" | "colorRef">;

type IToolsList = {
  [key in ToolNames]: Tool;
};

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
};
