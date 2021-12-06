import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";

const Actor = () => {
  const [actor, setActor] = useState({});
  let { id } = useParams();
  useEffect(() => {
    Api(`/actor/${id}`).then((data) => {
      setActor(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Movie</h1>
        {JSON.stringify(actor)}
      </div>
    </div>
  );
};

export default Actor;
