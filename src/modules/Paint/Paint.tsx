import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector } from "../../redux/hooks";
import { getPaintColor } from "./paintSlice";

const Paint = () => {
  const color = useAppSelector(getPaintColor);
  console.log(color);
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
