import React from "react";
import { CanvasWrap, Paint } from "./styled-components";
import SideMenu from "./SideMenu/SideMenu";
import Canvas from "./Canvas/Canvas";
import { useAppSelector } from "../../redux/hooks";
import { getPaintToolName } from "./paintSlice";
import { usePaint } from "./usePaint/usePaint";

const PaintPage = () => {
  const toolName = useAppSelector(getPaintToolName);

  const { canvasRef, width, height, saveCanvas, dataUrl, colorRef, resetCanvas, toolRef, undo, redo, canvasStatesRef } =
    usePaint();

  return (
    <Paint>
      <SideMenu
        resetCanvas={resetCanvas}
        toolName={toolName}
        colorRef={colorRef}
        dataUrl={dataUrl}
        saveCanvas={saveCanvas}
        toolRef={toolRef}
        undo={undo}
        redo={redo}
        canvasStatesRef={canvasStatesRef}
      />
      <CanvasWrap onContextMenu={e => e.preventDefault()}>
        <Canvas canvasRef={canvasRef} width={width} height={height} />
      </CanvasWrap>
    </Paint>
  );
};

export default React.memo(PaintPage);
