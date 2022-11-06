import { Routes, Route } from "react-router-dom";
import NoMatch from "../NoMatch/NoMatch";
import { routerPaths } from "./constants";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {routerPaths.map(route => {
          const { path, Component } = route;
          return <Route path={path} key={path} element={<Component />} />;
        })}

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
