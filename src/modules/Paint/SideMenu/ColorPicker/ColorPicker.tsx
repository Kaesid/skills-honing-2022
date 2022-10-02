import Collapsible from "react-collapsible";
import { useState } from "react";
import { useColorPicker } from "../useColorPicker";
import { defaultColors } from "../constants";
import { ColorPickerCollapsible, ColorPickerWrap } from "../styled-components";
import { HexColorPicker } from "react-colorful";

interface IColorPicker {
  colorRef: React.MutableRefObject<string>;
}

const ColorPicker = (props: IColorPicker) => {
  const { colorRef } = props;
  const [isOpen, setIsOpen] = useState(true);
  const { renderedColor, setActiveColor, paletteColors, setActivePaletteSlot } = useColorPicker({
    colorRef,
    defaultColors,
  });

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
        trigger={<ColorPickerCollapsible $isOpen={isOpen} style={{ background: renderedColor }} />}
      >
        <ColorPickerWrap>
          <HexColorPicker color={renderedColor} onChange={setActiveColor} />
        </ColorPickerWrap>
      </Collapsible>
      {Object.keys(paletteColors).map(key => (
        <button
          data-name={key}
          data-color={paletteColors[key]}
          key={key}
          style={{ background: paletteColors[key] }}
          onClick={setActivePaletteSlot}
        >
          {key}
        </button>
      ))}
    </>
  );
};

export default ColorPicker;
