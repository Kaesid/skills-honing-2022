import styled from "styled-components";
import { scroll } from "../../assets/images/svgrepo";
import { SCREEN_SIZES } from "../../constants/screen";

const scrollWidth = "40px";

const Paint = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    flex-direction: column;
  }
`;

const CanvasWrap = styled.div`
  max-width: 100vw;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto 0;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: unset;
    margin-right: ${scrollWidth};
    margin-top: 0;
    margin-bottom: 5px;

    &::after {
      content: "";
      z-index: 100;
      background-image: url(${scroll});
      background-position: center center;
      position: absolute;
      top: 10%;
      right: calc(-1 * ${scrollWidth} + 7px);
      background-size: 30px 30px;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      transform: rotate(90deg);
    }

    &::before {
      content: "";
      z-index: 99;
      position: absolute;
      background-image: linear-gradient(
        180deg,
        rgba(196, 203, 218, 1) 0%,
        rgba(167, 164, 224, 1) 30%,
        rgba(84, 85, 102, 1) 100%
      );
      top: 0;
      border-radius: 6px;
      border: 1px solid rgba(167, 164, 224, 1);
      box-shadow: 5px 6px 3px 1px #0000001f;
      right: calc(-1 * ${scrollWidth});
      height: 100%;
      width: 40px;
    }
  }
`;

export { Paint, CanvasWrap };
