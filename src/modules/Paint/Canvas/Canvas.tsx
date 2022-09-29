import { CanvasStyled } from "./styled-components";

interface ICanvas {
  cursor: string;
}

const Canvas = (props: ICanvas) => {
  const { cursor } = props;
  return <CanvasStyled style={cursor ? { cursor: `url(${cursor}), auto` } : undefined}></CanvasStyled>;
};

export default Canvas;
