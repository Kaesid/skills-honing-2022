import "./styles.scss";
import logo from "../../assets/images/logo.svg";
import { Counter } from "./Counter/Counter";

const CountersPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
};

export default CountersPage;
