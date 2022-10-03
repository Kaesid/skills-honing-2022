interface IColors {
  [key: string | number]: string;
}

interface IColorPicker {
  defaultColors: IColors;
  colorRef: React.MutableRefObject<string>;
}

export type { IColorPicker, IColors };
