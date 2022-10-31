import { useRef, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { IColorPicker, IColorsPalette } from "../../../interface";
import { getColorPalette, setColorPalette } from "../../../paintSlice";
import { useAppDispatch } from "../../../../../redux/hooks";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef } = props;

  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const paletteColors = useAppSelector(getColorPalette);
  const activePaletteSlot = useRef(Object.keys(paletteColors)[0]);
  const dispatch = useAppDispatch();
  const setPaletteColors = (newPalette: IColorsPalette) => dispatch(setColorPalette(newPalette));
  const [isCollapsibleOpen, setIsCollapasibleOpen] = useState(true);

  const setActiveColor = (newColor: any) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);
    if (!activePaletteSlot.current) return;
    setPaletteColors({ ...paletteColors, [activePaletteSlot.current]: newColor });
  };

  const setActivePaletteSlot = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, color } = e.currentTarget.dataset;

    if (!color || !name) return;

    activePaletteSlot.current = name;
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
    activePaletteSlot: activePaletteSlot.current,
  };
};

export { useColorPicker };
