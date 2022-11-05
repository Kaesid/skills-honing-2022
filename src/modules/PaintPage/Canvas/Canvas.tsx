import { ICanvas } from "./interface";
import { CanvasStyled } from "./styled-components";

const Canvas = (props: ICanvas) => {
  const { width, height, canvasRef } = props;

  return (
    <CanvasStyled
      width={width}
      height={height}
      // style={cursor ? { cursor: `url(${cursor}), auto` } : undefined}
      ref={canvasRef}
    ></CanvasStyled>
  );
};

export default Canvas;
