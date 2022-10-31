import { toolsList } from "./constants";
import {
  CanvasStateIcon,
  IconBox,
  IconsBox,
  SideMenuButton,
  SideMenuButtons,
  SideMenuStyled,
} from "./styled-components";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import { ISideMenu } from "./interface";
import { useSideMenu } from "./useSideMenu";
import { Redo, Undo } from "../../../assets/images/svgrepo";
import UndoRedo from "./components/UndoRedo/UndoRedo";

const SideMenu = (props: ISideMenu) => {
  const { toolName, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef, undo, redo, canvasStatesRef } = props;
  const { setToolName } = useSideMenu({ toolRef });

  return (
    <SideMenuStyled>
      <ColorPicker colorRef={colorRef} />
      {/* <IconsBox>
        <CanvasStateIcon onClick={undo}>
          <Undo />
        </CanvasStateIcon>
        <CanvasStateIcon onClick={redo}>
          <Redo />
        </CanvasStateIcon>
      </IconsBox> */}
      <UndoRedo undo={undo} redo={redo} canvasStatesRef={canvasStatesRef} />
      <IconsBox>
        {toolsList.map(({ IconComponent, tooltip }) => (
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
