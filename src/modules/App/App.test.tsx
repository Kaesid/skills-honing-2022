import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import PageContent from "./PageContent/PageContent";
import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import { Messages } from "../../constants/text";
import { RoutesPath } from "../../constants/routes";
import { ToolNames } from "../PaintPage/SideMenu/constants";

test("initial page rendering", async () => {
  render(
    <Provider store={store}>
      <PageContent />
    </Provider>,

    { wrapper: BrowserRouter }
  );
  const text = Messages.HOME__BUTTON_TEXT;
  //   const user = userEvent.setup();

  // verify page content for default route
  expect(screen.getByText(text)).toBeInTheDocument();

  //   // verify page content for expected route after navigating
  //   await user.click(screen.getByText(/about/i));
  //   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const badRoute = "/some/bad/route";

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <PageContent />
    </MemoryRouter>
  );

  // verify navigation to "no match" route
  expect(screen.getByText(Messages.WRONG_PAGE)).toBeInTheDocument();
});

test("check paint page", async () => {
  const route = RoutesPath.CANVAS;
  const user = userEvent.setup();
  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>
        <PageContent />
      </Provider>
    </MemoryRouter>
  );
  const canvas = screen.getByTestId("canvas");
  const eraser = screen.getByTestId(ToolNames.ERASER);
  const saveButton = screen.getByTestId("save");
  const undoBtton = screen.getByTestId("undo");

  await user.pointer([
    // touch the screen at element1
    { keys: "[TouchA>]", target: canvas },
    // move the touch pointer to element2
    { pointerName: "TouchA", target: eraser },
    // release the touch pointer at the last position (element2)
    { keys: "[/TouchA]" },
  ]);

  await user.click(undoBtton);
  await user.click(saveButton);
});

test("rendering a chosen page", () => {
  const route = RoutesPath.ABOUT;

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>
        <PageContent />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(Messages.ABOUT__PARTING_WORDS)).toBeInTheDocument();
});
