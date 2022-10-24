import styled, { css } from "styled-components";
import { SCREEN_SIZES } from "../../../constants/screen";

const SideMenuStyled = styled.div`
  background: #484854;
  color: white;
  min-height: calc(100vh - 40px);
  width: 240px;
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
`;

const metallicTheme = css`
  background-image: conic-gradient(
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6,
    #d7d7d7,
    #c3c3c3,
    #cccccc,
    #c6c6c6
  );
  box-shadow: inset #6e6e6e 0 0px 0px 4px, /* border */ inset hsla(0, 0%, 15%, 0.8) 0 -1px 5px 4px,
    /* soft SD */ inset hsla(0, 0%, 0%, 0.25) 0 -1px 0px 7px, /* bottom SD */ inset hsla(0, 0%, 100%, 0.7) 0 2px 1px 7px,
    /* top HL */ hsla(0, 0%, 0%, 0.15) 0 -5px 6px 4px, /* outer SD */ hsla(0, 0%, 100%, 0.5) 0 0px 0px 0px; /* outer HL */
  border: 1px solid #bdbcbc;
  text-shadow: hsla(0, 0%, 40%, 0.5) 0 -1px 0, hsla(0, 0%, 100%, 0.6) 0 2px 1px;
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

    circle {
      stroke: #38313a;
    }
  }
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
