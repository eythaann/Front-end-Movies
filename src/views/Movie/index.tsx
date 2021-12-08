import style from "./Movie.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { publicFolder } from "../../components/common";
import { Grow, Rating, Skeleton } from "@mui/material";
import { DeleteMovie, AddCast, EditMovie } from "../../components/layouts";

const Movie = (): JSX.Element => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    description: "",
    rating: "",
    cast: [],
    premiere: "",
    trailerLink: "",
    gener: "",
    duration: "",
    img: "",
    error: null,
  });
  const [loaded, setLoaded] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    Api(`/movie/${id}`).then((data) => {
      if (data !== undefined) {
        setMovie(data);
        setLoaded(true);
      }
    });
  }, []);

  //if not exist Movie show a error message
  if (movie.error) {
    return (
      <div className="container">
        <div className="content">
          <div className={style.error}>
            <p>Movie not found</p>
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  //if  exist Movie show the info
  // loaded? if for show the Skeleton while is charging
  return (
    <div className="container">
      <div className="content">
        <div className={style.movie} key={movie.id}>
          <div className={style.movieImage}>
            {loaded ? (
              <Grow in={loaded} timeout={600}>
                <img src={publicFolder + movie.img} alt={movie.title} />
              </Grow>
            ) : (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}
          </div>
          <div className={style.movieDescription}>
            {loaded ? (
              <div className={style.titles}>
                <h1>{movie.title}</h1>
                <div className={style.actions}>
                  <EditMovie movie={movie} />
                  <DeleteMovie movieId={movie.id} />
                </div>
              </div>
            ) : (
              //This are the Skeleton of Movie Content
              <div className={style.titles}>
                <div>
                  <Skeleton variant="text" width="160px" height="50px" />
                  <Skeleton variant="text" width="100px" height="30px" />
                </div>
                <div className={style.actions}>
                  <Skeleton variant="rectangular" width="60px" height="30px" />
                  <Skeleton variant="rectangular" width="60px" height="30px" />
                </div>
              </div>
            )}
            {loaded ? (
              <div>
                <Rating value={Number(movie.rating)} readOnly />
                <h3>General View</h3>
                <b>
                  {movie.gener} - {movie.duration} minutes
                </b>
                <p>{movie.description}</p>
              </div>
            ) : (
              <div>
                <Skeleton variant="text" width="120px" height="30px" />
                <Skeleton variant="rectangular" width="100%" height="100px" />
              </div>
            )}
            <br />
            //This are the Casts List of the Movie
            {loaded ? (
              <div style={{ position: "relative", top: "0", left: "0" }}>
                <h4>Casting: </h4>
                <AddCast movieId={movie.id} />
                <div className={style.cast}>
                  {movie.cast.map((item: any) => (
                    <Link to={`/actor/${item.id}`} key={item.id}>
                      <img src={publicFolder + item.img} alt={item.name} />
                      <h4>{item.name}</h4>
                      <p>{item.interpretation}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              //This are the Skeleton of Cast
              <div style={{ position: "relative", top: "0", left: "0" }}>
                <Skeleton variant="rectangular" width="100px" height="30px" />
                <br />
                <Skeleton variant="rectangular" width="100%" height="100px" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
