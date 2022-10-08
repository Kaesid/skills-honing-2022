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

interface ButtonProps {
  tooltip: string;
  IconComponent: React.FC;
  src: string;
  size?: number;
}

enum ToolNames {
  PENCIL = "pencil",
  ERASER = "eraser",
  BRUSH = "brush",
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
  {
    tooltip: "bigBrush",
    IconComponent: BigBrush,
    src: bigBrush,
  },
  {
    tooltip: "caption",
    IconComponent: Caption,
    src: caption,
  },
  {
    tooltip: "line",
    IconComponent: Line,
    src: line,
  },
  {
    tooltip: "square",
    IconComponent: Square,
    src: square,
  },
  {
    tooltip: "circle",
    IconComponent: Circle,
    src: circle,
  },
];

export { buttonsList, ToolNames };
