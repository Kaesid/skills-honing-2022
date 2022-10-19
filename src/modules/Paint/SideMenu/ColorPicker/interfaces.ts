import { DefaultColors } from "./constants";

// type IColorsName = "BLACK" | "YELLLOW" | "RED" | "BLUE" | "GREEN" | "PURPLE" | "LIGHT_BLUE" | "LIGHT_GREEN";
type IColorsPalette = typeof DefaultColors;

type IColorsName = keyof IColorsPalette;

interface IPaletteSlot {
  readonly color: string;
  readonly isSelected: boolean;
}

export type { IColorsName, IPaletteSlot, IColorsPalette };
