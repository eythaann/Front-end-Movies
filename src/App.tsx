import { Routes, Route } from "react-router";
import { PrincipalsRoutes } from "./routes";
import { Actors, Home, Movies, NotFound404, Movie, Actor } from "./views";

function App(): JSX.Element {
  return (
    <Routes>
      //routes Managment of the App
      <Route path="/" element={<PrincipalsRoutes />}>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
