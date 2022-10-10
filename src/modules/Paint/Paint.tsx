import { CanvasWrap, PaintPage } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector } from "../../redux/hooks";
import { getPaintToolName } from "./paintSlice";
import { usePaint } from "./usePaint/usePaint";

const Paint = () => {
  const toolName = useAppSelector(getPaintToolName);

  const { canvasRef, width, height, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef } = usePaint();

  return (
    <PaintPage
    //  onContextMenu={e => e.preventDefault()}
    >
      <SideMenu
        resetCanvas={resetCanvas}
        toolName={toolName}
        colorRef={colorRef}
        dataUrl={dataUrl}
        saveCanvas={saveCanvas}
        toolRef={toolRef}
      />
      <CanvasWrap>
        <Canvas canvasRef={canvasRef} width={width} height={height} />
      </CanvasWrap>
    </PaintPage>
  );
};

export default Paint;
