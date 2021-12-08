import style from "./Actor.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { url } from "../../components/common";
import {
  DeleteActor,
  AddInterpretation,
  EditActor,
} from "../../components/layouts";

const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState({
    id: "",
    name: "",
    biography: "",
    interpretations: [],
    img: "",
    born: "",
    death: "",
    error: null,
  });
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    Api(`/actor/${id}`).then((data) => {
      setActor(data);
      setloaded(true);
      console.log(data);
    });
  }, []);

  const ActorContent = () => {
    if (!loaded) return <div></div>;
    if (actor.error) {
      return (
        <div className={style.error}>
          <p>Actor not found</p>
          <Link to="/">Go to Home</Link>
        </div>
      );
    }
    return (
      <div className={style.actor} key={actor.id}>
        <div className={style.actorImage}>
          <img src={url + actor.img} alt={actor.name} />
        </div>
        <div className={style.actorDescription}>
          <div className={style.titles}>
            <h2>{actor.name}</h2>
            <div>
              <EditActor actor={actor} />
              <DeleteActor actorId={actor.id} />
            </div>
          </div>
          <br />
          <h3>Biography</h3>
          <p>{actor.biography}</p>
          <div style={{ position: "relative", top: "0", left: "0" }}>
            <AddInterpretation actorId={actor.id} />
            <div className={style.interpretations}>
              {actor.interpretations.map((item: any) => (
                <Link to={`/movie/${item.id}`} key={item.id}>
                  <img src={url + item.img} alt={item.title} />

                  <h4>{item.title}</h4>
                  <p>{item.interpretation}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="content">
        <ActorContent />
      </div>
    </div>
  );
};

export default Actor;
