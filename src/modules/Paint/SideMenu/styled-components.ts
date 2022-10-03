import styled from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";
import { linkActiveColor } from "../../../constants/styled-components";

const SideMenuStyled = styled.div`
  background: #484854;
  color: white;
  min-height: calc(100vh - 40px);
  width: 200px;
  margin-top: -40px;

  @media (max-width: ${SCREEN_SIZES.TABLET}px) {
    width: 100vw;
    min-height: unset;
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

const SideMenuButton = styled.a`
  padding: 8px 40px;
  max-width: 200px;
  background-color: #abe3ab;
  border-radius: 8px;
  color: black;
  cursor: pointer;
`;

const SideMenuButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

export { SideMenuStyled, IconsBox, IconBox, SideMenuButton, SideMenuButtons };
