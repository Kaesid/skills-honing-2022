import { useLocation } from "react-router-dom";
import { routerPaths, RoutesPath } from "../../modules/App/AppRoutes/paths";
import { AppHeader, HeaderLogo, LogoLink, NavBar, MyLink } from "./styled-components";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppHeader>
      <LogoLink to={RoutesPath.ROOT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        {routerPaths.map(({ path, text }) => (
          <MyLink className={path === pathname ? "active" : ""} to={path} key={path}>
            {text}
          </MyLink>
        ))}
      </NavBar>
    </AppHeader>
  );
};

export default Header;
