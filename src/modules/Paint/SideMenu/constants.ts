import { Pencil, Eraser, Brush, Square, Circle, Line } from "../../../assets/images/svgrepo";
import { ButtonProps } from "./interface";

enum ToolNames {
  PENCIL = "pencil",
  ERASER = "eraser",
  BRUSH = "brush",
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
  LINE = "line",
}

const toolsList: ButtonProps[] = [
  {
    tooltip: ToolNames.PENCIL,
    IconComponent: Pencil,
  },
  {
    tooltip: ToolNames.ERASER,
    IconComponent: Eraser,
  },
  {
    tooltip: ToolNames.BRUSH,
    IconComponent: Brush,
  },
  {
    tooltip: ToolNames.LINE,
    IconComponent: Line,
  },
  {
    tooltip: ToolNames.RECTANGLE,
    IconComponent: Square,
  },
  {
    tooltip: ToolNames.CIRCLE,
    IconComponent: Circle,
  },
];

export { toolsList, ToolNames };
