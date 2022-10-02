import { useRef } from "react";
import { useState } from "react";
import { IColorPicker } from "./interfaces";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef, defaultColors } = props;

  const activeButton = useRef("");
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const [paletteColors, setPaletteColors] = useState(defaultColors);
  const [isCollapsibleOpen, setIsCollapasibleOpen] = useState(true);

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

  const collapsibleParams = {
    isCollapsibleOpen,
    onCollapsibleOpen: () => setIsCollapasibleOpen(true),
    onCollapsibleClose: () => setIsCollapasibleOpen(false),
  };

  return { setActivePaletteSlot, setActiveColor, paletteColors, renderedColor, collapsibleParams };
};

export { useColorPicker };
