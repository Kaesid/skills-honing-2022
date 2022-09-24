import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";

const CanvasStyled = styled.div`
  background: white;
  max-width: 100%;
  width: 600px;
  height: 80vh;
  border: 1px black solid;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100%;
  }
`;

export { CanvasStyled };
