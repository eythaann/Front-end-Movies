import styles from "./Movies.module.css";
import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { url } from "../../components/common";
import { Grow, Rating, TextField } from "@mui/material";

let cache: any = [];
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Api("/movies").then((data) => {
      setMovies(data);
      setLoaded(true);
      cache = data;
    });
  }, []);

  const search = (e: any) => {
    console.log(e.target.value);
    const searched = e.target.value.toLowerCase();
    setMovies(
      cache.filter((v: any) => v.title.toLowerCase().includes(searched))
    );
  };
  return (
    <div className="container">
      <div className="content">
        <h1>Movies</h1>
        <div className={styles.content}>
          <div className={styles.menu}>
            <TextField
              label="Search"
              fullWidth
              type="search"
              onChange={search}
            />
          </div>
          <MovieList loaded={loaded} movies={movies} />
        </div>
      </div>
    </div>
  );
};

const MovieList = (props: any): JSX.Element => {
  if (!props.loaded) {
    let loading = [];
    for (let i = 1; i <= 10; i++) {
      loading.push(<div className={styles.targetLoading}></div>);
    }
    return <div className={styles.moviesList}>{loading}</div>;
  }
  const list = props.movies.map((item: any, i: number) => {
    return (
      <Grow
        in={props.loaded}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.min((i + 1) * 400, 2000)}
      >
        <div className={styles.target} key={item.id}>
          <Link className={styles.a} to={`/movie/${item.id}`}>
            <img src={url + item.img} />
          </Link>
          <div>
            <h3>{item.title}</h3>
            <p>{item.premiere.slice(0, 10)}</p>
            <span className={styles.rating}>
              <Rating value={Number(item.rating)} readOnly />
            </span>
          </div>
        </div>
      </Grow>
    );
  });
  return <div className={styles.moviesList}>{list}</div>;
};

export default Movies;
