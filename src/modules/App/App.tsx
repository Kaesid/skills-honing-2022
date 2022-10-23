import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";
import AppRoutes from "../../components/RoutesList/RoutesList";
import "./styles.scss";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
