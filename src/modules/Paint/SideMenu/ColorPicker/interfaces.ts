import { DefaultColors } from "./constants";

// type IColorsName = "BLACK" | "YELLLOW" | "RED" | "BLUE" | "GREEN" | "PURPLE" | "LIGHT_BLUE" | "LIGHT_GREEN";
type IColorsName = keyof typeof DefaultColors;

interface IPaletteSlot {
  readonly color: string;
  readonly isSelected: boolean;
}

export type { IColorsName, IPaletteSlot };
