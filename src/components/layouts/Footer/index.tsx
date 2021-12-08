import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>Page Made by Eythan</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/actors">Actors</Link>
      </div>
    </footer>
  );
};

export default Footer;
