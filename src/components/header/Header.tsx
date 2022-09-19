import { useEffect, useState } from "react";
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

const Header = () => {
  const { isMobile } = useMobileResolutionCheck();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleBurger = () => setIsBurgerOpen(prevValue => !prevValue);

  useEffect(() => {
    if (!isMobile) setIsBurgerOpen(false);
  }, [isMobile]);

  return (
    <AppHeader>
      <LogoLink isBurgerOpen={isBurgerOpen} to={RoutesPath.ROOT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        {isMobile ? (
          isBurgerOpen ? (
            <IconWrap>
              <CloseIcon onClick={toggleBurger} size={25} />
              <BurgerMenu>
                <RoutesLinksList onClick={() => setIsBurgerOpen(false)} />
              </BurgerMenu>
            </IconWrap>
          ) : (
            <IconWrap>
              <BurgerIcon onClick={toggleBurger} size={30} />
            </IconWrap>
          )
        ) : (
          <RoutesLinksList />
        )}
      </NavBar>
    </AppHeader>
  );
};

export default Header;
