import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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
  const paths = [
    {
      url: "/about",
      text: "About",
    },
    {
      url: "/",
      text: "Default",
    },
  ];
  return (
    <NavBar className="nav">
      {paths.map((path) => (
        <MyLink
          className={path.url === location.pathname ? "active" : ""}
          to={path.url}
          key={path.url}
        >
          {path.text}
        </MyLink>
      ))}
    </NavBar>
  );
};

export default Header;
