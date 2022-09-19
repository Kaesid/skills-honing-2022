import React from "react";
import { MyLink } from "../Header/styled-components";
import { routerPaths } from "../RoutesList/paths";
import { useLocation } from "react-router-dom";

const RoutesLinksList = (props: { onClick?: () => void }) => {
  const { pathname } = useLocation();
  const { onClick } = props;

  return (
    <>
      {routerPaths.map(({ path, text }) => (
        <MyLink onClick={onClick} className={path === pathname ? "active" : ""} to={path} key={path}>
          {text}
        </MyLink>
      ))}
    </>
  );
};

export default React.memo(RoutesLinksList);
