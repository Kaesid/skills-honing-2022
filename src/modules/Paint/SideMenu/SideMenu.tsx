import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

const SideMenu = () => {
  const [color, setColor] = useState("#aabbcc");

  return (
    <SideMenuStyled>
      <ColorPickerWrap>
        <HexColorPicker color={color} onChange={setColor} />
      </ColorPickerWrap>
      <IconsBox>
        {buttonsList.map(({ IconComponent, size }) => (
          <IconBox>
            <IconComponent size={size ? size : undefined} />
          </IconBox>
        ))}
      </IconsBox>
    </SideMenuStyled>
  );
};

export default SideMenu;
