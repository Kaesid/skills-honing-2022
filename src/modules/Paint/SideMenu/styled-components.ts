import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";
import { linkActiveColor } from "../../../constants/styled-components";

const SideMenuStyled = styled.div`
  background: #484854;
  color: white;
  height: calc(100vh - 40px);
  width: max(15%, 100px);
  margin-top: -40px;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100vw;
    height: fit-content;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  & .react-colorful {
    width: 100%;
  }

  & .react-colorful__saturation {
    border-radius: 0;
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

export { SideMenuStyled, IconsBox, IconBox };
