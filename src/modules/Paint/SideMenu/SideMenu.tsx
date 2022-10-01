import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap, ColorPickerCollapsible } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import Collapsible from "react-collapsible";

interface ISideMenu {
  color: string;
  cursor: string;
  setColor: (color: string) => void;
  setCursor: (cursor: string) => void;
  download: () => void;
  dataUrl: string;
}
const SideMenu = (props: ISideMenu) => {
  const { cursor, setCursor, setColor, color, download, dataUrl } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SideMenuStyled>
      <Collapsible
        open={isOpen}
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
        trigger={<ColorPickerCollapsible $isOpen={isOpen} style={{ background: color }} />}
      >
        <ColorPickerWrap>
          <HexColorPicker color={color} onChange={setColor} />
        </ColorPickerWrap>
      </Collapsible>

      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox onClick={() => setCursor(src)} className={src === cursor ? "active" : ""} key={src}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <a download="image.png" onClick={download} href={dataUrl}>
        Save
      </a>
    </SideMenuStyled>
  );
};

export default SideMenu;
