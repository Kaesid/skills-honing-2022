import { buttonsList } from "./constants";
import {
  IconBox,
  IconsBox,
  SideMenuStyled,
  ColorPickerWrap,
  ColorPickerCollapsible,
  ColorPickerCollapsibleColor,
} from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import pencil from "../../../assets/images/svgrepo/pencil.svg";
import Collapsible from "react-collapsible";

interface ISideMenu {
  color: string;
  cursor: string;
  setColor: (color: string) => void;
  setCursor: (cursor: string) => void;
}
const SideMenu = (props: ISideMenu) => {
  const { setColor, color, cursor, setCursor } = props;
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
    </SideMenuStyled>
  );
};

export default SideMenu;
