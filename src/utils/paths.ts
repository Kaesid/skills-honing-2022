import About from "../pages/About/About";
import App from "./../App";

export interface IRoute {
  path: string;
  text: string;
  Component: React.FunctionComponent | React.ComponentClass;
}

export enum RoutesPath {
  ROOT = "/",
  ABOUT = "/about",
}
const routerPaths: IRoute[] = [
  {
    path: RoutesPath.ABOUT,
    text: "About",
    Component: About,
  },
  {
    path: RoutesPath.ROOT,
    text: "Default",
    Component: App,
  },
];

export { routerPaths };
