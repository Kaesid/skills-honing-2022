import { DefaultColors } from "./constants";

// type IColorsName = "BLACK" | "YELLLOW" | "RED" | "BLUE" | "GREEN" | "PURPLE" | "LIGHT_BLUE" | "LIGHT_GREEN";
type IColorsName = keyof typeof DefaultColors;

// type IColors = {
//   IColorsName: string;
// };

// type IColors = Record<[key in DefaultColors], string>;

interface IPaletteSlot {
  readonly color: string;
  readonly isSelected: boolean;
}

export type { IColorsName, IPaletteSlot };
