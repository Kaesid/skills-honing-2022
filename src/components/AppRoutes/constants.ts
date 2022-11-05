import AboutPage from "../AboutPage/AboutPage";
import Paint from "../../modules/PaintPage/PaintPage";
import { IRoute } from "./interface";
import HomePage from "../HomePage/HomePage";

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
    Component: Paint,
  },
];

export { routerPaths, RoutesPath };
