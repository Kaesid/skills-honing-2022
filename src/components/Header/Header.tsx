import {
  AppHeader,
  HeaderLogo,
  LogoLink,
  NavBar,
  CloseIcon,
  BurgerIcon,
  IconWrap,
  BurgerMenu,
  GlobalStyleOverflow,
  RoutesLinksTab,
} from "./styled-components";
import { useMobileResolutionCheck } from "../../hooks/useMobileResolutionCheck";
import RoutesLinksList from "../RoutesLinksList/RoutesLinksList";
import { useLocation } from "react-router-dom";
import { useBurger } from "./useBurger";
import { RoutesPath } from "../AppRoutes/constants";

const Header = () => {
  const { isMobile } = useMobileResolutionCheck();
  const { isBurgerOpen, closeBurger, toggleBurger } = useBurger(isMobile);
  const { pathname } = useLocation();

  return (
    <AppHeader>
      <LogoLink $isLogoNonClickable={pathname === RoutesPath.ABOUT} onClick={closeBurger} to={RoutesPath.ABOUT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        <GlobalStyleOverflow isBurgerOpen={isBurgerOpen} />
        {isMobile ? (
          isBurgerOpen ? (
            <IconWrap>
              <CloseIcon onClick={toggleBurger} size={25} />
              <BurgerMenu>
                <RoutesLinksTab>
                  <RoutesLinksList pathname={pathname} onClick={closeBurger} />
                </RoutesLinksTab>
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
