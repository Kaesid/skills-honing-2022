import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor?: string;
  // color: string;
  // currentColor: React.MutableRefObject<string>;
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface IDraw {
  position: { x: number; y: number };
  // ctx: CanvasRenderingContext2D | null;
}

const Canvas = (props: ICanvas) => {
  const { cursor, width, height, canvasRef } = props;

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
