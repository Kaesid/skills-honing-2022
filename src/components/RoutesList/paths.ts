import About from "../../modules/About/About";
import CountersPage from "../../modules/Counters/Counters";
import Paint from "./../../modules/Paint/Paint";

export interface IRoute {
  path: string;
  text: string;
  Component: React.FunctionComponent | React.ComponentClass;
}

export enum RoutesPath {
  ROOT = "/",
  ABOUT = "/about",
  DEBUG = "/debug",
}
const routerPaths: IRoute[] = [
  {
    path: RoutesPath.ABOUT,
    text: "About",
    Component: About,
  },
  {
    path: RoutesPath.DEBUG,
    text: "Debug",
    Component: CountersPage,
  },
  {
    path: RoutesPath.ROOT,
    text: "Paint",
    Component: Paint,
  },
];

export { routerPaths };
