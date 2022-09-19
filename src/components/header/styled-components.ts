import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FiAlignJustify } from "react-icons/fi";

const linkNonActiveColor = "ghostwhite";
const linkActiveColor = "#53fbcd";

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 68%, rgba(175, 0, 255, 1) 100%);
  height: 40px;
  padding: 0 40px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const LogoLink = styled(Link)`
  height: 100%;
  width: 40px;
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
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: ${linkNonActiveColor};
  font-weight: bold;

  &:hover,
  &.active {
    color: ${linkActiveColor};
  }

  &.active {
    pointer-events: none;
  }
`;

export { NavBar, AppHeader, LogoLink, HeaderLogo, MyLink, CloseIcon, BurgerIcon };
