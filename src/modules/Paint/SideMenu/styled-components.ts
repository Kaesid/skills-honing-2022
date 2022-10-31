import styled, { css } from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";
import { noTextHiglight } from "../../../styles/styled-components/helpers";
import { metallicTheme } from "../../../styles/styled-components/themes";

const SideMenuStyled = styled.div`
  background: #484854;
  color: white;
  min-height: calc(100vh - 40px);
  width: 240px;
  margin-top: -40px;
  ${noTextHiglight}

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
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  cursor: pointer;
  ${metallicTheme}

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: #38313a;
    }

    circle {
      stroke: #38313a;
    }
  }

  ${(props: { readonly $isActive?: boolean }) =>
    props.$isActive &&
    css`
      svg {
        path {
          fill: rgb(197 37 70);
        }
        circle {
          stroke: rgb(197 37 70);
        }
      }
    `}
`;

const CanvasStateIcon = styled(IconBox)`
  width: 65px;
  svg {
    width: 35px;
    height: 35px;

    path {
      fill: #38313a;
    }
  }

  ${(props: { readonly $isBlocked?: boolean }) =>
    props.$isBlocked &&
    css`
      cursor: default;
      opacity: 0.5;
    `}
`;

const SideMenuButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

const SideMenuButton = styled.a`
  padding: 12px 40px;
  max-width: 200px;
  ${metallicTheme}
  border-radius: 8px;
  color: black;
  cursor: pointer;
  font-weight: 700;
`;

export { SideMenuStyled, IconsBox, IconBox, SideMenuButton, SideMenuButtons, CanvasStateIcon, metallicTheme };
