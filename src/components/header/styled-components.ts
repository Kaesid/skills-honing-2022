import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

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

export { NavBar, AppHeader, LogoLink, HeaderLogo, MyLink };
