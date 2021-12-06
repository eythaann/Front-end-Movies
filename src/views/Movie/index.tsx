import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";

const Movie = (): JSX.Element => {
  const [movie, setMovie] = useState({});
  let { id } = useParams();

  useEffect(() => {
    Api(`/movie/${id}`).then((data) => {
      setMovie(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Movie</h1>
        {JSON.stringify(movie)}
      </div>
    </div>
  );
};

export default Movie;
