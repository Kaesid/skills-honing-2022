import styled from "styled-components";
import { SCREEN_SIZES } from "../../constants/screen";

const PaintPage = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: crosshair;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CanvasWrap = styled.div`
  /* width: 100vw; */
  max-width: 100vw;
  width: 100%;

  display: flex;
  justify-content: center;
  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: unset;
    /* margin: 0 25px; */
    margin-right: 40px;
  }
`;

export { PaintPage, CanvasWrap };
