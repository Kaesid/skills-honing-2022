import { useRef } from "react";
import { useState } from "react";
import { IColorPicker } from "./interfaces";
import { DefaultColors } from "./constants";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef } = props;
  const activeButton = useRef(Object.keys(DefaultColors)[0]);
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const [paletteColors, setPaletteColors] = useState(DefaultColors);
  const [isCollapsibleOpen, setIsCollapasibleOpen] = useState(true);

  const setActiveColor = (newColor: any) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);
    if (!activeButton.current) return;

    setPaletteColors(prev => ({ ...prev, [activeButton.current]: newColor }));
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

  return {
    setActivePaletteSlot,
    setActiveColor,
    paletteColors,
    renderedColor,
    collapsibleParams,
    activePaletteSlot: activeButton.current,
  };
};

export { useColorPicker };
