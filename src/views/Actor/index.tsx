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
import { Skeleton, Grow } from "@mui/material";

const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState({
    id: "",
    name: "",
    biography: "",
    interpretations: [],
    img: "",
    place: "",
    born: "",
    death: "",
    error: null,
  });
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    Api(`/actor/${id}`).then((data) => {
      setActor(data);
      setloaded(true);
    });
  }, []);

  const ActorContent = () => {
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
          {loaded ? (
            <Grow in={loaded} timeout={600}>
              <img src={url + actor.img} alt={actor.name} />
            </Grow>
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </div>
        <div className={style.actorDescription}>
          {loaded ? (
            <div className={style.titles}>
              <div>
                <h1>{actor.name}</h1>
                <p>
                  {actor.place} <b>Age:</b>
                  {new Date().getFullYear() - Number(actor.born.slice(0, 4))}
                </p>
              </div>
              <div className={style.actions}>
                <EditActor actor={actor} />
                <DeleteActor actorId={actor.id} />
              </div>
            </div>
          ) : (
            <div className={style.titles}>
              <div>
                <Skeleton variant="text" width="160px" height="50px" />
                <Skeleton variant="text" width="100px" height="30px" />
              </div>
              <div className={style.actions}>
                <Skeleton variant="rectangular" width="60px" height="30px" />
                <Skeleton variant="rectangular" width="60px" height="30px" />
              </div>
            </div>
          )}
          <br />
          {loaded ? (
            <div>
              <h3>Biography</h3>
              <p>{actor.biography}</p>
            </div>
          ) : (
            <div>
              <Skeleton variant="text" width="120px" height="30px" />
              <Skeleton variant="rectangular" width="100%" height="100px" />
            </div>
          )}
          <br />
          {loaded ? (
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
          ) : (
            <div style={{ position: "relative", top: "0", left: "0" }}>
              <Skeleton variant="rectangular" width="100px" height="30px" />
              <br />
              <Skeleton variant="rectangular" width="100%" height="100px" />
            </div>
          )}
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
