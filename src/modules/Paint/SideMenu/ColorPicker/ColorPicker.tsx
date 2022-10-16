import { memo } from "react";
import Collapsible from "react-collapsible";
import { HexColorPicker } from "react-colorful";
import { useColorPicker } from "./useColorPicker";
import { ISideMenu } from "./../SideMenu";
import { ColorPickerCollapsible, ColorPickerWrap, HexColorPickerWrap, Palette, PaletteSlot } from "./styled-components";
import { IColorsName } from "./interfaces";

const ColorPicker = (props: Pick<ISideMenu, "colorRef">) => {
  const { colorRef } = props;

  const { renderedColor, setActiveColor, paletteColors, setActivePaletteSlot, collapsibleParams, activePaletteSlot } =
    useColorPicker({
      colorRef,
    });

  const { isCollapsibleOpen, onCollapsibleOpen, onCollapsibleClose } = collapsibleParams;

  return (
    <ColorPickerWrap $isOpen={isCollapsibleOpen}>
      <Collapsible
        open={isCollapsibleOpen}
        onOpening={onCollapsibleOpen}
        onClosing={onCollapsibleClose}
        trigger={<ColorPickerCollapsible $isOpen={isCollapsibleOpen} $color={renderedColor} />}
      >
        <HexColorPickerWrap>
          <HexColorPicker color={renderedColor} onChange={setActiveColor} />
        </HexColorPickerWrap>
      </Collapsible>
      <Palette>
        {(Object.keys(paletteColors) as IColorsName[]).map(key => (
          <PaletteSlot
            data-name={key}
            data-color={paletteColors[key]}
            isSelected={key === activePaletteSlot}
            color={paletteColors[key]}
            key={key}
            onClick={setActivePaletteSlot}
          />
        ))}
      </Palette>
    </ColorPickerWrap>
  );
};

export default memo(ColorPicker);
