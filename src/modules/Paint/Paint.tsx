import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";

const Paint = () => {
  return (
    <PaintPage>
      <SideMenu></SideMenu>
      <CanvasWrap>
        <Canvas></Canvas>
      </CanvasWrap>
    </PaintPage>
  );
};

export default Paint;
