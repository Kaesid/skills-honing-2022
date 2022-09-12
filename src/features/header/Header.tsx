import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav">
      <Link to="/about">About</Link>
      <Link to="/">Default</Link>
    </nav>
  );
};

export default Header;
