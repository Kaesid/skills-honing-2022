import { useRef, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { IColorPicker, IColorsName, IColorsPalette } from "../../../interface";
import { getColorPalette, setColorPalette, setSelectedColorSlot } from "../../../paintSlice";
import { useAppDispatch } from "../../../../../redux/hooks";
import { getPaintState } from "./../../../paintSlice";
import { flushSync } from "react-dom";

const useColorPicker = (props: IColorPicker) => {
  const { colorRef } = props;
  const paintState = useAppSelector(getPaintState);
  const dispatch = useAppDispatch();
  const setSelectedPaletteSlot = (selectedSlot: IColorsName) => dispatch(setSelectedColorSlot(selectedSlot));
  const { selectedColorSlot, colorsPalette } = paintState;
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  const setPaletteColors = (newPalette: IColorsPalette) => dispatch(setColorPalette(newPalette));
  const [isCollapsibleOpen, setIsCollapasibleOpen] = useState(true);

  const setActiveColor = (newColor: string) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);

    setPaletteColors({ ...colorsPalette, [selectedColorSlot]: newColor });
  };

  const setActivePaletteSlot = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, color } = e.currentTarget.dataset;

    if (!color || !name) return;
    const selectedSlot = name as IColorsName;
    setSelectedPaletteSlot(selectedSlot);
    colorRef.current = color;
  };

  const collapsibleParams = {
    isCollapsibleOpen,
    onCollapsibleOpen: () => setIsCollapasibleOpen(true),
    onCollapsibleClose: () => setIsCollapasibleOpen(false),
  };

  return {
    setActivePaletteSlot,
    setActiveColor,
    paletteColors: colorsPalette,
    renderedColor,
    collapsibleParams,
    activePaletteSlot: selectedColorSlot,
  };
};

export { useColorPicker };
