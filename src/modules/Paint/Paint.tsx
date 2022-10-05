import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPaintCursor, setPaintCursor } from "./paintSlice";
import { usePaint } from "../../hooks/usePaint/usePaint";

const Paint = () => {
  const dispatch = useAppDispatch();

  const cursor = useAppSelector(getPaintCursor);

  const setCursor = (cursor: string) => dispatch(setPaintCursor(cursor));
  const { canvasRef, width, height, saveCanvas, dataUrl, colorRef } = usePaint();

  return (
    <PaintPage onContextMenu={e => e.preventDefault()}>
      <SideMenu colorRef={colorRef} dataUrl={dataUrl} saveCanvas={saveCanvas} cursor={cursor} setCursor={setCursor} />
      <CanvasWrap>
        <Canvas canvasRef={canvasRef} width={width} height={height} cursor={cursor} />
      </CanvasWrap>
    </PaintPage>
  );
};

export default Paint;
