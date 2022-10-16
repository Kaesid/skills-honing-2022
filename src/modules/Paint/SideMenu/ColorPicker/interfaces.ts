type IColorsName = "BLACK" | "YELLLOW" | "RED" | "BLUE" | "GREEN" | "PURPLE" | "LIGHT_BLUE" | "LIGHT_GREEN";

type IColors = {
  [key in IColorsName]: string;
};

interface IPaletteSlot {
  readonly color: string;
  readonly isSelected: boolean;
}

export type { IColors, IColorsName, IPaletteSlot };
