import { useMobileResolutionCheck } from "../../../hooks/useMobileResolutionCheck";
import { usePainting } from "../../../hooks/usePainting";
import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor: string;
}

const Canvas = (props: ICanvas) => {
  const { cursor } = props;
  const { canvasRef, width, height } = usePainting();
  const { isMobile } = useMobileResolutionCheck();
  console.log(canvasRef.current?.clientWidth);
  // console.log(canvasRef);
  // console.log(window.innerWidth);
  // console.log(window.innerHeight);

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
