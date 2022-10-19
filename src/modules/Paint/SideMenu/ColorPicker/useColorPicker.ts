import { useRef } from "react";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { IColorPicker } from "../../interface";
import { getColorPalette, setColorPalette } from "../../paintSlice";
import { DefaultColors } from "./constants";
import { useAppDispatch } from "./../../../../redux/hooks";
import { IColorsPalette } from "./interfaces";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef } = props;
  const activeButton = useRef(Object.keys(DefaultColors)[0]);
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  // const [paletteColors, setPaletteColors] = useState(DefaultColors);
  const paletteColors = useAppSelector(getColorPalette);
  // console.log(paletteColors2);s
  const dispatch = useAppDispatch();
  const setPaletteColors = (newPalette: IColorsPalette) => dispatch(setColorPalette(newPalette));
  const [isCollapsibleOpen, setIsCollapasibleOpen] = useState(true);

  const setActiveColor = (newColor: any) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);
    if (!activeButton.current) return;
    setPaletteColors({ ...paletteColors, [activeButton.current]: newColor });
    // setPaletteColors(prev => ({ ...prev, [activeButton.current]: newColor }));
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
