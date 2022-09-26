import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";
import { linkActiveColor } from "../../../constants/styled-components";

const SideMenuStyled = styled.div`
  background: rgba(9, 9, 121, 1);
  color: white;
  height: calc(100vh - 40px);
  width: max(15%, 100px);
  /* width: fit-content; */
  /* width: 20%; */
  margin-top: -40px;
  /* border-top: 1px gray solid; */
  padding-top: 5px;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100vw;
    height: fit-content;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const IconsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px;

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: white;
    }

    circle {
      stroke: white;
    }
  }

  .active {
    svg {
      path {
        fill: ${linkActiveColor};
      }
      circle {
        stroke: ${linkActiveColor};
      }
    }
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  cursor: pointer;
`;

const ColorPickerWrap = styled.div`
  max-width: 100%;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    .react-colorful {
      width: 100%;
    }
  }
`;

export { SideMenuStyled, IconsBox, IconBox, ColorPickerWrap };
