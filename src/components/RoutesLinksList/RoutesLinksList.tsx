import React from "react";
import { MyLink } from "../Header/styled-components";
import { routerPaths } from "../RoutesList/paths";
import { useLocation } from "react-router-dom";

const RoutesLinksList = () => {
  const { pathname } = useLocation();

  return (
    <>
      {routerPaths.map(({ path, text }) => (
        <MyLink className={path === pathname ? "active" : ""} to={path} key={path}>
          {text}
        </MyLink>
      ))}
    </>
  );
};

export default React.memo(RoutesLinksList);
