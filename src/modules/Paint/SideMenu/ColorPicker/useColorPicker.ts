import { useRef } from "react";
import { useState } from "react";
import { IColorPicker } from "./interfaces";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef, defaultColors } = props;

  const activeButton = useRef("");
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const [paletteColors, setPaletteColors] = useState(defaultColors);

  const setActiveColor = (newColor: string) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);

    if (!activeButton.current) return;

    setPaletteColors(prev => {
      return { ...prev, [activeButton.current]: newColor };
    });
  };

  const setActivePaletteSlot = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, color } = e.currentTarget.dataset;

    if (!color || !name) return;

    activeButton.current = name;
    setActiveColor(color);
  };

  return { setActivePaletteSlot, setActiveColor, paletteColors, renderedColor };
};

export { useColorPicker };
