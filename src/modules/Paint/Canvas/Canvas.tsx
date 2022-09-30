import { useMobileResolutionCheck } from "../../../hooks/useMobileResolutionCheck";
import { usePainting } from "../../../hooks/usePainting";
import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor: string;
}

const Canvas = (props: ICanvas) => {
  const { cursor } = props;
  const { canvasRef, width, height } = usePainting();

  return (
    <CanvasStyled
      width={width}
      height={height}
      style={cursor ? { cursor: `url(${cursor}), auto` } : undefined}
      ref={canvasRef}
    ></CanvasStyled>
  );
};

export default Canvas;
