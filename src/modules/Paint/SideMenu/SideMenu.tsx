import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuButton, SideMenuButtons, SideMenuStyled } from "./styled-components";
import ColorPicker from "./ColorPicker/ColorPicker";

export interface ISideMenu {
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

  return (
    <SideMenuStyled>
      <ColorPicker colorRef={colorRef} />
      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox onClick={() => setCursor(src)} className={src === cursor ? "active" : ""} key={src}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <SideMenuButtons>
        <SideMenuButton download="image.png" onClick={saveCanvas} href={dataUrl}>
          Save
        </SideMenuButton>
        <SideMenuButton>Reset</SideMenuButton>
      </SideMenuButtons>
    </SideMenuStyled>
  );
};

export default SideMenu;
