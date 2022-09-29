import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPaintColor, getPaintCursor, setPaintColor, setPaintCursor } from "./paintSlice";

const Paint = () => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(getPaintColor);
  const cursor = useAppSelector(getPaintCursor);
  const setColor = (color: string) => dispatch(setPaintColor(color));
  const setCursor = (color: string) => dispatch(setPaintCursor(color));
  console.log(color);
  return (
    <PaintPage>
      <SideMenu color={color} setColor={setColor} cursor={cursor} setCursor={setCursor}></SideMenu>
      <CanvasWrap>
        <Canvas cursor={cursor}></Canvas>
      </CanvasWrap>
    </PaintPage>
  );
};

export default Paint;
