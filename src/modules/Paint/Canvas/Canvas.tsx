import { usePainting } from "../../../hooks/usePainting";
import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor: string;
}

const Canvas = (props: ICanvas) => {
  const { cursor } = props;
  const { canvasRef } = usePainting();
  console.log(canvasRef);
  return <CanvasStyled style={cursor ? { cursor: `url(${cursor}), auto` } : undefined} ref={canvasRef}></CanvasStyled>;
};

export default Canvas;
