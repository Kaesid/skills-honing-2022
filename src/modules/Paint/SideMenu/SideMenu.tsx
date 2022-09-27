import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap, ColorPickerCollapsible } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import pencil from "../../../assets/images/svgrepo/pencil.svg";
import Collapsible from "react-collapsible";

const SideMenu = () => {
  const [color, setColor] = useState("#aabbcc");
  const [cursor, setCursor] = useState<null | string>(null);
  const piy = (src: string) => {
    console.log(cursor);
    // setCursor(`url(${pencil})`);
    // setCursor(`url(${src}), auto`);
    setCursor(src);
  };
  // const { IconComponent } = buttonsList[0];
  return (
    <SideMenuStyled style={cursor ? { cursor: `url(${cursor}), auto` } : undefined}>
      <Collapsible trigger={<ColorPickerCollapsible style={{ background: color }} />}>
        <ColorPickerWrap>
          <HexColorPicker color={color} onChange={setColor} />
        </ColorPickerWrap>
      </Collapsible>

      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox onClick={() => piy(src)} className={src === cursor ? "active" : ""} key={src}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
    </SideMenuStyled>
  );
};

export default SideMenu;
