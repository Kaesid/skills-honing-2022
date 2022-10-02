import { buttonsList, defaultColors } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap, ColorPickerCollapsible } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { MouseEventHandler, useRef, useState } from "react";
import Collapsible from "react-collapsible";
import { useColorPicker } from "./useColorPicker";

interface ISideMenu {
  // color: string;
  cursor: string;
  // setColor: (color: string) => void;
  setCursor: (cursor: string) => void;
  saveCanvas: () => void;
  dataUrl: string;
  colorRef: React.MutableRefObject<string>;
}
const SideMenu = (props: ISideMenu) => {
  const { cursor, setCursor, saveCanvas, dataUrl, colorRef } = props;
  const [isOpen, setIsOpen] = useState(true);
  const { renderedColor, setActiveColor, paletteColors, setActivePaletteSlot } = useColorPicker({
    colorRef,
    defaultColors,
  });

  return (
    <SideMenuStyled>
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
      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox onClick={() => setCursor(src)} className={src === cursor ? "active" : ""} key={src}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <a download="image.png" onClick={saveCanvas} href={dataUrl}>
        Save
      </a>
    </SideMenuStyled>
  );
};

export default SideMenu;
