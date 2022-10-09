type IColorsName = "BLACK" | "YELLLOW" | "RED" | "BLUE" | "GREEN" | "PURPLE" | "LIGHT_BLUE" | "LIGHT_GREEN";

type IColors = {
  [key in IColorsName]: string;
};
// interface IColors {
//   [key: string]: string[keyof IColors];
// }

interface IColorPicker {
  // DefaultColors: DefaultColors;
  colorRef: React.MutableRefObject<string>;
}

export type { IColorPicker, IColors, IColorsName };
