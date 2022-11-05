import { Routes, Route, useLocation } from "react-router-dom";
import NoMatch from "../NoMatch/NoMatch";
import { routerPaths } from "./constants";

export const LocationDisplay = () => {
  const location = useLocation();

  return (
    <div style={{ display: "none" }} data-testid="location-display">
      {location.pathname}
    </div>
  );
};

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
      <LocationDisplay />
    </>
  );
};

export default AppRoutes;
