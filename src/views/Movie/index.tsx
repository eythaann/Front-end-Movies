import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";

const Movie = (): JSX.Element => {
  const [movie, setMovie] = useState({});
  let { id } = useParams();

  useEffect(() => {
    Api(`/movie/${id}`, setMovie);
  }, []);

  return (
    <div>
      <h1>Movie</h1>
      {JSON.stringify(movie)}
    </div>
  );
};

export default Movie;
