import { RoutesPath } from "../RoutesList/paths";
import {
  AppHeader,
  HeaderLogo,
  LogoLink,
  NavBar,
  CloseIcon,
  BurgerIcon,
  IconWrap,
  BurgerMenu,
} from "./styled-components";
import { useMobileResolutionCheck } from "../../hooks/useMobileResolutionCheck";
import RoutesLinksList from "./../RoutesLinksList/RoutesLinksList";
import { useLocation } from "react-router-dom";
import { useBurger } from "./useBurger";

const Header = () => {
  const { isMobile } = useMobileResolutionCheck();
  const { isBurgerOpen, closeBurger, toggleBurger } = useBurger(isMobile);
  const { pathname } = useLocation();

  return (
    <AppHeader>
      <LogoLink $isLogoNonClickable={pathname === RoutesPath.ROOT} onClick={closeBurger} to={RoutesPath.ROOT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        {isMobile ? (
          isBurgerOpen ? (
            <IconWrap>
              <CloseIcon onClick={toggleBurger} size={25} />
              <BurgerMenu>
                <RoutesLinksList pathname={pathname} onClick={closeBurger} />
              </BurgerMenu>
            </IconWrap>
          ) : (
            <IconWrap>
              <BurgerIcon onClick={toggleBurger} size={30} />
            </IconWrap>
          )
        ) : (
          <RoutesLinksList pathname={pathname} />
        )}
      </NavBar>
    </AppHeader>
  );
};

export default Header;
