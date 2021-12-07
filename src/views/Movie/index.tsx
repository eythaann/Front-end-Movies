import style from "./Movie.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { url } from "../../components/common";
import { Rating } from "@mui/material";

const Movie = (): JSX.Element => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    description: "",
    rating: "",
    cast: [],
    premiere: "",
    trailerLink: "",
    img: "",
    error: null,
  });
  const [loaded, setLoaded] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    Api(`/movie/${id}`).then((data) => {
      if (data !== undefined) {
        setMovie(data);
        setLoaded(true);
      }
    });
  }, []);

  const MovieContent = () => {
    if (!loaded) return <div></div>;
    if (movie.error) {
      return (
        <div className={style.error}>
          <p>Movie not found</p>
          <Link to="/">Go to Home</Link>
        </div>
      );
    }
    return (
      <div className={style.movie} key={movie.id}>
        <div className={style.movieImage}>
          <img src={url + movie.img} alt={movie.title} />
        </div>
        <div className={style.movieDescription}>
          <h1>{movie.title}</h1>
          <Rating value={Number(movie.rating)} readOnly />
          <h3>General View</h3>
          <p>{movie.description}</p>
          <div style={{ position: "relative", top: "0", left: "0" }}>
            <h4>Casting: </h4>
            <div className={style.cast}>
              {movie.cast.map((item: any) => (
                <Link to={`/actor/${item.id}`} key={item.id}>
                  <img src={url + item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>{item.interpretation}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="content">
        <MovieContent />
      </div>
    </div>
  );
};

export default Movie;
