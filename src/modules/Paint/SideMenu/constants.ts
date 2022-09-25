import { AiFillFormatPainter } from "react-icons/ai";
import { BsFillBrushFill, BsFillChatLeftTextFill, BsFillClockFill, BsFillPencilFill } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { TbEraser } from "react-icons/tb";

interface ButtonProps {
  tooltip: string;
  IconComponent: IconType;
  size?: number;
}

const buttonsList: ButtonProps[] = [
  {
    tooltip: "painter",
    IconComponent: AiFillFormatPainter,
  },
  {
    tooltip: "painter",
    IconComponent: BsFillBrushFill,
  },
  {
    tooltip: "painter",
    IconComponent: BsFillChatLeftTextFill,
  },
  {
    tooltip: "painter",
    IconComponent: BsFillClockFill,
  },
  {
    tooltip: "painter",
    IconComponent: BsFillPencilFill,
  },
  {
    tooltip: "painter",
    IconComponent: TbEraser,
    size: 22,
  },
];

export { buttonsList };
