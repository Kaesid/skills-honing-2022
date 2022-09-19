import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";
import AppRoutes from "./AppRoutes/AppRoutes";
import "./styles.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
