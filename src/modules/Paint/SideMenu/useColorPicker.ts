import { IColors } from "./constants";
import { useRef } from "react";
import { useState } from "react";

interface IColorPicker {
  defaultColors: IColors;
  colorRef: React.MutableRefObject<string>;
}

const useColorPicker = (props: IColorPicker) => {
  const { colorRef, defaultColors } = props;
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const activeButton = useRef("");

  const [paletteColors, setPaletteColors] = useState(defaultColors);
  //   console.log(paletteColors);

  const setActiveColor = (newColor: string) => {
    colorRef.current = newColor;
    if (activeButton.current) {
      setPaletteColors(prev => {
        return { ...prev, [activeButton.current]: newColor };
      });
    }

    setRenderedColor(newColor);
  };

  const setActivePaletteSlot = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, color } = e.currentTarget.dataset;
    if (!color || !name) return;
    // setColorList(prev => {
    //   return { ...prev, active: name };
    // });
    activeButton.current = name;
    setActiveColor(color);
    // console.log(name);
    // console.log(color);
  };

  return { setActivePaletteSlot, setActiveColor, paletteColors, renderedColor };
};

export { useColorPicker };
