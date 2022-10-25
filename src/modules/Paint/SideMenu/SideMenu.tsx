import { buttonsList } from "./constants";
import {
  CanvasStateIcon,
  IconBox,
  IconsBox,
  SideMenuButton,
  SideMenuButtons,
  SideMenuStyled,
} from "./styled-components";
import ColorPicker from "./ColorPicker/ColorPicker";
import { ISideMenu } from "./interface";
import { useSideMenu } from "./useSideMenu";
import { Redo, Undo } from "../../../assets/images/svgrepo";

const SideMenu = (props: ISideMenu) => {
  const { toolName, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef, undo, redo } = props;
  const { setToolName } = useSideMenu({ toolName, toolRef });

  return (
    <SideMenuStyled>
      <ColorPicker colorRef={colorRef} />
      <IconsBox>
        <CanvasStateIcon onClick={undo}>
          <Undo />
        </CanvasStateIcon>
        <CanvasStateIcon onClick={redo}>
          <Redo />
        </CanvasStateIcon>
      </IconsBox>
      <IconsBox>
        {buttonsList.map(({ IconComponent, tooltip }) => (
          <IconBox onClick={() => setToolName(tooltip)} $isActive={tooltip === toolName} key={tooltip}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <SideMenuButtons>
        <SideMenuButton download="image.png" onClick={saveCanvas} href={dataUrl}>
          Save
        </SideMenuButton>
        <SideMenuButton onClick={resetCanvas}>Reset</SideMenuButton>
      </SideMenuButtons>
    </SideMenuStyled>
  );
};

export default SideMenu;
