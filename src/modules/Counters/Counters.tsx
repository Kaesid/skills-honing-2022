import "./styles.scss";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Counter } from "./Counter/Counter";

const CountersPage = () => {
  return (
    <div className="App">
      <section className="App-header">
        <Logo className="App-logo" />
        <Counter />
      </section>
    </div>
  );
};

export default CountersPage;
