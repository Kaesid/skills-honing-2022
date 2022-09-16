import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { routerPaths } from "../../utils/paths";

const NavBar = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: green;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: blue;
  }
`;

const Header = () => {
  const location = useLocation();

  return (
    <NavBar className="nav">
      {routerPaths.map((route) => (
        <MyLink
          className={route.path === location.pathname ? "active" : ""}
          to={route.path}
          key={route.path}
        >
          {route.text}
        </MyLink>
      ))}
    </NavBar>
  );
};

export default Header;
