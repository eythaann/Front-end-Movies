import styles from "./Actors.module.css";
import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { url } from "../../components/common";
import { Grow, Skeleton, TextField } from "@mui/material";
import { AddActor } from "../../components/layouts";

let cache: any = [];

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Api("/actors").then((data) => {
      if (data != undefined) {
        setActors(data);
        setLoaded(true);
        cache = data;
      }
    });
  }, []);

  const search = (e: any) => {
    const searched = e.target.value.toLowerCase();
    setActors(
      cache.filter((v: any) => v.name.toLowerCase().includes(searched))
    );
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Actors</h1>
        <div className={styles.content}>
          <div className={styles.menu}>
            <TextField
              label="Search"
              fullWidth
              type="search"
              onChange={search}
            />
            <p>Don`t found a Actor? Add it!</p>
            <AddActor />
          </div>
          <ActorsList loaded={loaded} actors={actors} />
        </div>
      </div>
    </div>
  );
};

const ActorsList = (props: any): JSX.Element => {
  if (!props.loaded) {
    let loading = [];
    for (let i = 1; i <= 10; i++) {
      loading.push(
        <Skeleton
          key={i}
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ borderRadius: "15px" }}
        />
      );
    }
    return <div className={styles.moviesList}>{loading}</div>;
  }
  const list = props.actors.map((item: any, i: number) => {
    return (
      <Grow
        in={props.loaded}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.min((i + 1) * 400, 2000)}
        key={item.id}
      >
        <div className={styles.target}>
          <Link className={styles.a} to={`/actor/${item.id}`}>
            <img src={url + item.img} alt={item.name} />
          </Link>
          <div>
            <h3>{item.name}</h3>
            <p>{item.biography.slice(0, 20)}</p>
          </div>
        </div>
      </Grow>
    );
  });
  return <div className={styles.moviesList}>{list}</div>;
};

export default Actors;
