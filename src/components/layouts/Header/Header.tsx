import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { useDark } from "../../hooks";
import style from "./Header.module.css";

const Header = (): JSX.Element => {
  const dark = useDark();

  const DARK = () => {
    if (dark) localStorage.setItem("dark", "false");
    else localStorage.setItem("dark", "true");
    window.location.reload();
  };

  return (
    <header
      className={style.header}
      style={dark ? { background: "#444", color: "#fff" } : {}}
    >
      <div className={style.logo}>
        <Link to="/">MOVIES SA</Link>
      </div>
      <div>
        <span>☀️</span>
        <Switch onChange={DARK} color="default" checked={dark} />
        <span>🌙</span>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/actors">Actors</Link>
      </div>
    </header>
  );
};

export default Header;
