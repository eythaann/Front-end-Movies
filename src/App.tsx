import { Routes, Route } from "react-router";
import { PrincipalsRoutes } from "./routes";
import { Actors, Home, Movies, NotFound404 } from "./views";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<PrincipalsRoutes />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
