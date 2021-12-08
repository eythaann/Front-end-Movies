import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to="/">MOVIES SA</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/actors">Actors</Link>
      </div>
    </header>
  );
};

export default Header;
