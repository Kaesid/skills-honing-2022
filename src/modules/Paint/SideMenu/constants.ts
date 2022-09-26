import {
  Pencil,
  pencil,
  Eraser,
  eraser,
  Clock,
  clock,
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

interface aa {
  onClick: (arg0: string) => void;
}
interface ButtonProps {
  tooltip: string;
  IconComponent: React.FC<aa>;
  src: string;
  size?: number;
}

const buttonsList: ButtonProps[] = [
  {
    tooltip: "painter5",
    IconComponent: Pencil,
    src: pencil,
  },
  {
    tooltip: "painter6",
    IconComponent: Eraser,
    src: eraser,
  },
  {
    tooltip: "painter2",
    IconComponent: Brush,
    src: brush,
  },
  {
    tooltip: "painter1",
    IconComponent: BigBrush,
    src: bigBrush,
  },
  {
    tooltip: "painter3",
    IconComponent: Caption,
    src: caption,
  },
  {
    tooltip: "painter4",
    IconComponent: Line,
    src: line,
  },
  {
    tooltip: "painter4",
    IconComponent: Square,
    src: square,
  },
  {
    tooltip: "painter4",
    IconComponent: Circle,
    src: circle,
  },
];

export { buttonsList };
