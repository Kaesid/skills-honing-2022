import { buttonsList, ToolNames } from "./constants";
import { IconBox, IconsBox, SideMenuButton, SideMenuButtons, SideMenuStyled } from "./styled-components";
import ColorPicker from "./ColorPicker/ColorPicker";
import { setPaintToolName } from "./../paintSlice";
import { useAppDispatch } from "./../../../redux/hooks";
import { useEffect } from "react";

export interface ISideMenu {
  toolName: string;
  saveCanvas: () => void;
  dataUrl: string;
  colorRef: React.MutableRefObject<string>;
  toolRef: React.MutableRefObject<string>;
  resetCanvas: () => void;
}
const SideMenu = (props: ISideMenu) => {
  const dispatch = useAppDispatch();
  const { toolName, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef } = props;
  const setToolName = (toolName: string) => {
    toolRef.current = toolName;
    dispatch(setPaintToolName(toolName));
  };

  useEffect(() => {
    if (toolName !== ToolNames.PENCIL) setToolName(ToolNames.PENCIL);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <SideMenuButton onClick={resetCanvas}>Reset</SideMenuButton>
      </SideMenuButtons>
    </SideMenuStyled>
  );
};

export default SideMenu;
