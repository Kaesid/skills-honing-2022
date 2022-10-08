import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPaintToolName, setPaintToolName } from "./paintSlice";
import { usePaint } from "../../hooks/usePaint/usePaint";

const Paint = () => {
  const toolName = useAppSelector(getPaintToolName);

  const { canvasRef, width, height, saveCanvas, dataUrl, colorRef, clear } = usePaint({ toolName });

  return (
    <PaintPage
    //  onContextMenu={e => e.preventDefault()}
    >
      <SideMenu clear={clear} toolName={toolName} colorRef={colorRef} dataUrl={dataUrl} saveCanvas={saveCanvas} />
      <CanvasWrap>
        <Canvas canvasRef={canvasRef} width={width} height={height} />
      </CanvasWrap>
    </PaintPage>
  );
};

export default Paint;
