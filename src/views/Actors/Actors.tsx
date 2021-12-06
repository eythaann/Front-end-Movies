import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";

const Actors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    Api("/actors").then((data) => {
      setActors(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Actors</h1>
        {JSON.stringify(actors)}
      </div>
    </div>
  );
};

export default Actors;
