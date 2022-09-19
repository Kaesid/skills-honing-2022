import { RoutesPath } from "../RoutesList/paths";
import { AppHeader, HeaderLogo, LogoLink, NavBar, CloseIcon, BurgerIcon } from "./styled-components";
import { useMobileResolutionCheck } from "../../hooks/useMobileResolutionCheck";
import RoutesLinksList from "./../RoutesLinksList/RoutesLinksList";
import { useState } from "react";

const Header = () => {
  const { isMobile } = useMobileResolutionCheck();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  console.log(isBurgerOpen);

  return (
    <AppHeader>
      <LogoLink to={RoutesPath.ROOT}>
        <HeaderLogo />
      </LogoLink>
      <NavBar>
        {isMobile ? (
          <BurgerIcon onClick={() => setIsBurgerOpen(prevValue => !prevValue)} size={30} />
        ) : (
          <RoutesLinksList />
        )}

        {/* <CloseIcon size={20} />
        <BurgerIcon size={30} /> */}
      </NavBar>
    </AppHeader>
  );
};

export default Header;
