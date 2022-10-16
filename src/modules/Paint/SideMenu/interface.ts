import { ICanvasParamsList } from "../interface";
import { ToolNames } from "./constants";

type ISideMenuTools = Pick<ICanvasParamsList, "colorRef" | "toolRef">;

type ISideMenu = ISideMenuTools & {
  toolName: string;
  saveCanvas: () => void;
  dataUrl: string;
  resetCanvas: () => void;
};

type IUseSideMenu = Pick<ISideMenu, "toolRef" | "toolName">;

interface ButtonProps {
  tooltip: ToolNames;
  IconComponent: React.FC;
  src: string;
  size?: number;
}

export type { ISideMenu, ButtonProps, IUseSideMenu };
