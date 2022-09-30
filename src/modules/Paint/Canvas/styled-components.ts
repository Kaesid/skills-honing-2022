import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";

const CanvasStyled = styled.canvas`
  background: white;
  max-width: 100%;
  width: 600px; //TODO: adaptive size
  height: 80vh;
  height: 800px;
  border: 1px black solid;
  box-shadow: 5px 6px 3px 1px #0000001f;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100%;
  }
`;

export { CanvasStyled };
