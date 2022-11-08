import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import PageContent from "./PageContent/PageContent";
import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import { Messages } from "../../constants/text";
import { RoutesPath } from "../../constants/routes";

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
  expect(screen.getByText(/it seems/i)).toBeInTheDocument();
});

test("rendering a chosen page", () => {
  const route = RoutesPath.CANVAS;

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>
        <PageContent />
      </Provider>
    </MemoryRouter>
  );

  // verify location display is rendered
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
  // expect(screen.getByTestId("location-display")).toHaveTextContent(route);
});
