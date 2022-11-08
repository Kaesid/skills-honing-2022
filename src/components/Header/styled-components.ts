import styled, { css, createGlobalStyle } from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FiAlignJustify } from "react-icons/fi";
import { linkActiveColor, linkNonActiveColor } from "../../constants/styled-components";

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 68%, rgba(175, 0, 255, 1) 100%);
  height: 40px;
  padding: 0 40px;
  margin-bottom: 40px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

/* ${(props: { isBurgerOpen: boolean }) =>
    props.isBurgerOpen &&
    css`
      height: 100vh;
      width: 100%;
      z-index: 100;
      justify-content: flex-end;
      background-color: gray;
    `} */

const IconWrap = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoLink = styled(Link)`
  height: 100%;
  width: 40px;
  ${(props: { $isLogoNonClickable: boolean }) =>
    props.$isLogoNonClickable &&
    css`
      pointer-events: none;
    `}
`;

const CloseIcon = styled(GrClose)`
  cursor: pointer;
  & path {
    stroke: ${linkNonActiveColor};
  }

  &:hover {
    & path {
      stroke: red;
    }
  }
`;

const BurgerIcon = styled(FiAlignJustify)`
  cursor: pointer;
  color: ${linkNonActiveColor};

  &:hover {
    color: red;
  }
`;

const GlobalStyleOverflow = createGlobalStyle`
  body {
    overflow-y: ${(props: { readonly isBurgerOpen: boolean }) => (props.isBurgerOpen ? "hidden" : "unset")};
  }
  `;

const BurgerMenu = styled.div`
  position: absolute;
  z-index: 100;
  right: 0;
  top: 40px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  opacity: 0.9;
  background-color: rgba(2, 0, 36, 1);
  display: flex;
  padding-top: 20%;
  align-items: flex-start;
`;

const RoutesLinksTab = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled(Logo)`
  height: 100%;
  object-fit: contain;

  g {
    fill: ${linkNonActiveColor};
  }

  &:hover {
    g {
      fill: ${linkActiveColor};
    }
  }

  &:active {
    g {
      fill: ${linkNonActiveColor};
    }
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: ${linkNonActiveColor};
  font-weight: bold;

  &:hover {
    color: ${linkActiveColor};
  }

  ${(props: { readonly isActive: boolean }) =>
    props.isActive &&
    css`
      color: ${linkActiveColor};
      pointer-events: none;
    `}
`;

export {
  NavBar,
  AppHeader,
  LogoLink,
  HeaderLogo,
  MyLink,
  CloseIcon,
  BurgerIcon,
  IconWrap,
  BurgerMenu,
  GlobalStyleOverflow,
  RoutesLinksTab,
};
