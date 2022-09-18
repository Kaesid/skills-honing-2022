import { useLocation } from "react-router-dom";
import { routerPaths, RoutesPath } from "../../modules/App/AppRoutes/paths";
import { AppHeader, HeaderLogo, LogoLink, NavBar, MyLink } from "./styled-components";

const Header = () => {
  const location = useLocation();

  return (
    <AppHeader>
      <LogoLink to={RoutesPath.ROOT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        {routerPaths.map(route => (
          <MyLink className={route.path === location.pathname ? "active" : ""} to={route.path} key={route.path}>
            {route.text}
          </MyLink>
        ))}
      </NavBar>
    </AppHeader>
  );
};

export default Header;
