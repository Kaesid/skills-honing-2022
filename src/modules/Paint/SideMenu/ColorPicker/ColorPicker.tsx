import { memo } from "react";
import Collapsible from "react-collapsible";
import { HexColorPicker } from "react-colorful";
import { useColorPicker } from "./useColorPicker";
import { ISideMenu } from "./../SideMenu";
import { ColorPickerCollapsible, ColorPickerWrap, HexColorPickerWrap, Palette, PaletteSlot } from "./styled-components";
import { defaultColors } from "./constants";

const ColorPicker = (props: Pick<ISideMenu, "colorRef">) => {
  const { colorRef } = props;

  const { renderedColor, setActiveColor, paletteColors, setActivePaletteSlot, collapsibleParams } = useColorPicker({
    colorRef,
    defaultColors,
  });

  const { isCollapsibleOpen, onCollapsibleOpen, onCollapsibleClose } = collapsibleParams;

  return (
    <ColorPickerWrap $isOpen={isCollapsibleOpen}>
      <Collapsible
        open={isCollapsibleOpen}
        onOpening={onCollapsibleOpen}
        onClosing={onCollapsibleClose}
        trigger={<ColorPickerCollapsible $isOpen={isCollapsibleOpen} style={{ background: renderedColor }} />}
      >
        <HexColorPickerWrap>
          <HexColorPicker color={renderedColor} onChange={setActiveColor} />
        </HexColorPickerWrap>
      </Collapsible>
      <Palette>
        {Object.keys(paletteColors).map(key => (
          <PaletteSlot
            data-name={key}
            data-color={paletteColors[key]}
            $isSelected={paletteColors[key] === renderedColor}
            $color={paletteColors[key]}
            key={key}
            onClick={setActivePaletteSlot}
          />
        ))}
      </Palette>
    </ColorPickerWrap>
  );
};

export default memo(ColorPicker);
