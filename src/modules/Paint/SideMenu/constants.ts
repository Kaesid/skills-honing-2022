import {
  Pencil,
  pencil,
  Eraser,
  eraser,
  // Clock,
  // clock,
  Caption,
  caption,
  Brush,
  brush,
  BigBrush,
  bigBrush,
  Square,
  square,
  Circle,
  circle,
  line,
  Line,
} from "../../../assets/images/svgrepo";
import { ButtonProps } from "./interface";

enum ToolNames {
  PENCIL = "pencil",
  ERASER = "eraser",
  BRUSH = "brush",
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
  LINE = "line",
}

const buttonsList: ButtonProps[] = [
  {
    tooltip: ToolNames.PENCIL,
    IconComponent: Pencil,
    src: pencil,
  },
  {
    tooltip: ToolNames.ERASER,
    IconComponent: Eraser,
    src: eraser,
  },
  {
    tooltip: ToolNames.BRUSH,
    IconComponent: Brush,
    src: brush,
  },
  // {
  //   tooltip: ToolNames.BRUSH,
  //   IconComponent: BigBrush,
  //   src: bigBrush,
  // },
  // {
  //   tooltip: ToolNames.BRUSH,
  //   IconComponent: Caption,
  //   src: caption,
  // },
  {
    tooltip: ToolNames.LINE,
    IconComponent: Line,
    src: line,
  },
  {
    tooltip: ToolNames.RECTANGLE,
    IconComponent: Square,
    src: square,
  },
  {
    tooltip: ToolNames.CIRCLE,
    IconComponent: Circle,
    src: circle,
  },
];

export { buttonsList, ToolNames };
