import { toolsList } from "./constants";
import { IconBox, IconsBox, SideMenuButton, SideMenuButtons, SideMenuStyled } from "./styled-components";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import { ISideMenu } from "./interface";
import { useSideMenu } from "./useSideMenu";
import UndoRedo from "./components/UndoRedo/UndoRedo";

const SideMenu = (props: ISideMenu) => {
  const { toolName, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef, undo, redo, canvasStatesRef } = props;
  const { setToolName } = useSideMenu({ toolRef });

  return (
    <SideMenuStyled>
      <ColorPicker colorRef={colorRef} />
      <UndoRedo undo={undo} redo={redo} canvasStatesRef={canvasStatesRef} />
      <IconsBox>
        {toolsList.map(({ IconComponent, tooltip }) => (
          <IconBox
            data-testid={tooltip}
            onClick={() => setToolName(tooltip)}
            $isActive={tooltip === toolName}
            key={tooltip}
          >
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <SideMenuButtons>
        <SideMenuButton data-testid="save" download="image.png" onClick={saveCanvas} href={dataUrl}>
          Save
        </SideMenuButton>
        <SideMenuButton onClick={resetCanvas}>Reset</SideMenuButton>
      </SideMenuButtons>
    </SideMenuStyled>
  );
};

export default SideMenu;
