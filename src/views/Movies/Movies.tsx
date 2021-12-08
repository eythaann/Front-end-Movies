import styles from "./Movies.module.css";
import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { publicFolder } from "../../components/common";
import { Grow, Rating, Skeleton, TextField } from "@mui/material";
import { AddMovie } from "../../components/layouts";

let cache: any = [];
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Api("/movies").then((data) => {
      if (data !== undefined) {
        setMovies(data);
        setLoaded(true);
        cache = data;
      }
    });
  }, []);

  const search = (e: any) => {
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
            <p>Don't find your movie? add it!</p>
            <AddMovie />
          </div>
          <MovieList loaded={loaded} movies={movies} />
        </div>
      </div>
    </div>
  );
};

//This is the principal Movie List
const MovieList = (props: any): JSX.Element => {
  //while the data is loading show a Skeletont Layer
  if (!props.loaded) {
    let loading = [];
    for (let i = 1; i <= 10; i++) {
      loading.push(
        <Skeleton
          key={i}
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ borderRadius: "15px" }}
        />
      );
    }
    return <div className={styles.moviesList}>{loading}</div>;
  }
  //when the data is totally loaded show the movie List
  const list = props.movies.map((item: any, i: number) => {
    return (
      <Grow
        in={props.loaded}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.min((i + 1) * 400, 2000)}
        key={item.id}
      >
        <div className={styles.target}>
          <Link className={styles.a} to={`/movie/${item.id}`}>
            <img src={publicFolder + item.img} alt={item.title} />
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
