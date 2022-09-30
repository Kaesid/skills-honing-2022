import { usePainting } from "../../../hooks/usePainting";
import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor: string;
}

const Canvas = (props: ICanvas) => {
  const { cursor } = props;
  const { canvasRef } = usePainting();
  console.log(canvasRef);
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  return (
    <CanvasStyled
      // width={window.innerWidth}
      // height={window.innerHeight}
      width={600}
      height={800}
      style={cursor ? { cursor: `url(${cursor}), auto` } : undefined}
      ref={canvasRef}
    ></CanvasStyled>
  );
};

export default Canvas;
