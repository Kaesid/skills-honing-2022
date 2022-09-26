import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import pencil from "../../../assets/images/svgrepo/pencil.svg";
const SideMenu = () => {
  const [color, setColor] = useState("#aabbcc");
  const [cursor, setCursor] = useState<null | string>(null);
  const piy = (src: string) => {
    console.log(cursor);
    // setCursor(`url(${pencil})`);
    setCursor(`url(${src}), auto`);
  };
  // const { IconComponent } = buttonsList[0];
  return (
    <SideMenuStyled style={cursor ? { cursor } : undefined}>
      <ColorPickerWrap>
        <HexColorPicker color={color} onChange={setColor} />
      </ColorPickerWrap>
      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox key={src}>
            <IconComponent onClick={() => piy(src)} />
          </IconBox>
        ))}
      </IconsBox>
    </SideMenuStyled>
  );
};

export default SideMenu;
