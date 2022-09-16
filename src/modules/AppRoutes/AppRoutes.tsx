import { Routes, Route } from "react-router-dom";
import { routerPaths } from "../../utils/paths";

const AppRoutes = () => (
  <Routes>
    {routerPaths.map((route) => {
      const { path, Component } = route;
      return <Route path={path} key={path} element={<Component />} />;
    })}
  </Routes>
);

export default AppRoutes;
