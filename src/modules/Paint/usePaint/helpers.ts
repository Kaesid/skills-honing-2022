import { ITouchPosiitionGet } from "../interface";

const setTouchEventPosition = (props: ITouchPosiitionGet) => {
  const { position, e } = props;
  if (!window.TouchEvent || !(e instanceof TouchEvent)) return;
  const bcr = (e.target as HTMLElement).getBoundingClientRect();
  const x = e.targetTouches[0].clientX - bcr.x;
  const y = e.targetTouches[0].clientY - bcr.y;
  [position.current.x, position.current.y] = [x, y];
};

export { setTouchEventPosition };
