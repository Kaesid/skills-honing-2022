import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";

const CanvasStyled = styled.canvas`
  position: relative;
  background: white;
  max-width: 100%;
  width: 600px;
  width: min(90%, 1440px);
  height: 800px;
  border: 1px black solid;
  box-shadow: 5px 6px 3px 1px #0000001f;
  touch-action: none;
  cursor: crosshair;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100%;
    height: 700px;
  }
`;

export { CanvasStyled };
