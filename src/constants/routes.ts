import { IRoute } from "../modules/App/AppRoutes/interface";
import AboutPage from "../components/AboutPage/AboutPage";
import HomePage from "../components/HomePage/HomePage";
import PaintPage from "../modules/PaintPage/PaintPage";

enum RoutesPath {
  CANVAS = "/canvas",
  ABOUT = "/about",
  HOME = "/",
}

const routerPaths: IRoute[] = [
  {
    path: RoutesPath.HOME,
    text: "Home",
    Component: HomePage,
  },
  {
    path: RoutesPath.ABOUT,
    text: "About",
    Component: AboutPage,
  },
  {
    path: RoutesPath.CANVAS,
    text: "Canvas",
    Component: PaintPage,
  },
];

export { routerPaths, RoutesPath };
