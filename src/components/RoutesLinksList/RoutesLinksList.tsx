import React from "react";
import { MyLink } from "../Header/styled-components";
import { routerPaths } from "../RoutesList/constants";

const RoutesLinksList = (props: { onClick?: () => void; pathname: string }) => {
  const { onClick, pathname } = props;

  return (
    <>
      {routerPaths.map(({ path, text }) => (
        <MyLink onClick={onClick} isActive={path === pathname} to={path} key={path}>
          {text}
        </MyLink>
      ))}
    </>
  );
};

export default React.memo(RoutesLinksList);
