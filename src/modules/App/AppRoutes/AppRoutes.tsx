import { Routes, Route } from "react-router-dom";
import NoMatchPage from "../../../components/NoMatchPage/NoMatchPage";
import { routerPaths } from "../../../constants/routes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {routerPaths.map(route => {
          const { path, Component } = route;
          return <Route path={path} key={path} element={<Component />} />;
        })}

        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
