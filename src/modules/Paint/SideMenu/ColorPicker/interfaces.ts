interface IColors {
  [key: string]: string;
}

interface IColorPicker {
  defaultColors: IColors;
  colorRef: React.MutableRefObject<string>;
}

export type { IColorPicker, IColors };
