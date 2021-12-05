import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";

const Actor = () => {
  const [actor, setActor] = useState({});
  let { id } = useParams();
  useEffect(() => {
    Api(`/actor/${id}`, setActor);
  }, []);

  return <div>{JSON.stringify(actor)}</div>;
};

export default Actor;
