import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";
const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Api("/movies", setMovies);
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.map((item: any) => (
        <p key={item.id}>{JSON.stringify(item)}</p>
      ))}
    </div>
  );
};

export default Movies;
