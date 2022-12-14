import { ICanvasParams } from "../interface";
import { ToolNames } from "./constants";

type ISideMenuTools = Pick<ICanvasParams, "colorRef" | "toolRef" | "canvasStatesRef">;

type ISideMenu = ISideMenuTools & {
  toolName: string;
  saveCanvas: () => void;
  dataUrl: string;
  resetCanvas: () => void;
  undo: () => void;
  redo: () => void;
};

type IUseSideMenu = Pick<ISideMenu, "toolRef">;

interface ButtonProps {
  tooltip: ToolNames;
  IconComponent: React.FC;
}

export type { ISideMenu, ButtonProps, IUseSideMenu };
