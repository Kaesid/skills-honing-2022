import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";
import PageContent from "./PageContent/PageContent";
import "./styles.scss";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PageContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
