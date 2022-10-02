import { buttonsList, defaultColors } from "./constants";
import { IconBox, IconsBox, SideMenuStyled, ColorPickerWrap, ColorPickerCollapsible } from "./styled-components";
import { HexColorPicker } from "react-colorful";
import { MouseEventHandler, useState } from "react";
import Collapsible from "react-collapsible";

interface ISideMenu {
  color: string;
  cursor: string;
  setColor: (color: string) => void;
  setCursor: (cursor: string) => void;
  saveCanvas: () => void;
  dataUrl: string;
  colorRef: React.MutableRefObject<string>;
}
const SideMenu = (props: ISideMenu) => {
  const { cursor, setCursor, saveCanvas, dataUrl, colorRef } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [renderedColor, setRenderedColor] = useState(colorRef.current);
  // const;

  const [colorsList, setColorList] = useState(defaultColors);

  const setActiveColor = (newColor: string) => {
    colorRef.current = newColor;
    setRenderedColor(newColor);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, color } = e.currentTarget.dataset;
    if (color) setActiveColor(color);
    console.log(name);
    console.log(color);
  };

  return (
    <SideMenuStyled>
      <Collapsible
        open={isOpen}
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
        trigger={<ColorPickerCollapsible $isOpen={isOpen} style={{ background: renderedColor }} />}
      >
        <ColorPickerWrap>
          <HexColorPicker color={renderedColor} onChange={setActiveColor} />
        </ColorPickerWrap>
      </Collapsible>
      {Object.keys(colorsList).map(key => (
        <button
          data-name={key}
          data-color={colorsList[key]}
          key={key}
          style={{ background: colorsList[key] }}
          onClick={onClick}
        >
          {key}
        </button>
      ))}
      <IconsBox>
        {buttonsList.map(({ IconComponent, src, size, tooltip }) => (
          <IconBox onClick={() => setCursor(src)} className={src === cursor ? "active" : ""} key={src}>
            <IconComponent />
          </IconBox>
        ))}
      </IconsBox>
      <a download="image.png" onClick={saveCanvas} href={dataUrl}>
        Save
      </a>
    </SideMenuStyled>
  );
};

export default SideMenu;
