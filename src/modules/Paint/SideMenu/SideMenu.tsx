import { buttonsList } from "./constants";
import { IconBox, IconsBox, SideMenuButton, SideMenuButtons, SideMenuStyled } from "./styled-components";
import ColorPicker from "./ColorPicker/ColorPicker";
import { useAppSelector } from "../../../redux/hooks";
import { getPaintToolName, setPaintToolName } from "./../paintSlice";
import { useAppDispatch } from "./../../../redux/hooks";

export interface ISideMenu {
  toolName: string;
  saveCanvas: () => void;
  dataUrl: string;
  colorRef: React.MutableRefObject<string>;
  clear: () => void;
}
const SideMenu = (props: ISideMenu) => {
  const { toolName, saveCanvas, dataUrl, colorRef, clear } = props;
  const dispatch = useAppDispatch();
  const setToolName = (cursor: string) => dispatch(setPaintToolName(cursor));

  return (
    <SideMenuStyled>
      <ColorPicker colorRef={colorRef} />
      <IconsBox>
        {buttonsList.map(({ IconComponent, tooltip }) => (
          <IconBox onClick={() => setToolName(tooltip)} className={tooltip === toolName ? "active" : ""} key={tooltip}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <SideMenuButtons>
        <SideMenuButton download="image.png" onClick={saveCanvas} href={dataUrl}>
          Save
        </SideMenuButton>
        <SideMenuButton onClick={clear}>Reset</SideMenuButton>
      </SideMenuButtons>
    </SideMenuStyled>
  );
};

export default SideMenu;
