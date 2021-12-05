import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";

const Actors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    Api("/actors", setActors);
  }, []);

  return (
    <div>
      <h1>actors</h1>
      {JSON.stringify(actors)}
    </div>
  );
};

export default Actors;
