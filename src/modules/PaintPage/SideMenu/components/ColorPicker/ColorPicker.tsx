import { memo } from "react";
import Collapsible from "react-collapsible";
import { HexColorPicker } from "react-colorful";
import { useColorPicker } from "./useColorPicker";
import { ICanvasParams, IColorsName } from "../../../interface";
import { ColorPickerCollapsible, ColorPickerWrap, HexColorPickerWrap, Palette, PaletteSlot } from "./styled-components";

const ColorPicker = (props: Pick<ICanvasParams, "colorRef">) => {
  const { colorRef } = props;

  const { setActiveColor, colorsPalette, setActivePaletteSlot, collapsibleParams, selectedColorSlot } = useColorPicker({
    colorRef,
  });

  const { isCollapsibleOpen, onCollapsibleOpen, onCollapsibleClose } = collapsibleParams;

  const currentColor = colorsPalette[selectedColorSlot];

  return (
    <ColorPickerWrap $isOpen={isCollapsibleOpen}>
      <Collapsible
        open={isCollapsibleOpen}
        onOpening={onCollapsibleOpen}
        onClosing={onCollapsibleClose}
        trigger={<ColorPickerCollapsible $isOpen={isCollapsibleOpen} $color={currentColor} />}
      >
        <HexColorPickerWrap>
          <HexColorPicker color={currentColor} onChange={setActiveColor} />
        </HexColorPickerWrap>
      </Collapsible>
      <Palette>
        {(Object.keys(colorsPalette) as IColorsName[]).map(key => (
          <PaletteSlot
            data-name={key}
            data-color={colorsPalette[key]}
            isSelected={key === selectedColorSlot}
            color={colorsPalette[key]}
            key={key}
            onClick={setActivePaletteSlot}
          />
        ))}
      </Palette>
    </ColorPickerWrap>
  );
};

export default memo(ColorPicker);
