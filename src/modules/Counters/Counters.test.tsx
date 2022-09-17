import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import CountersPage from "./Counters";
import { store } from "../../redux/store";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <CountersPage />
    </Provider>
  );

  expect(getByText(/Add With Saga/i)).toBeInTheDocument();
});
