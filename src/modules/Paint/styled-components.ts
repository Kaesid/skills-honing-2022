import styled from "styled-components";
import { SCREEN_SIZES } from "../../constants/screen";

const PaintPage = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CanvasWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export { PaintPage, CanvasWrap };
