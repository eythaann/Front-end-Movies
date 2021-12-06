import styles from "./Actors.module.css";
import { useEffect, useState } from "react";
import { Api } from "../../components/hooks";
import { Link } from "react-router-dom";
import { url } from "../../components/common";
import { Grow, TextField } from "@mui/material";

let cache: any = [];

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Api("/actors").then((data) => {
      setActors(data);
      setLoaded(true);
      cache = data;
    });
  }, []);

  const search = (e: any) => {
    console.log(e.target.value);
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
      loading.push(<div className={styles.targetLoading}></div>);
    }
    return <div className={styles.moviesList}>{loading}</div>;
  }
  const list = props.actors.map((item: any, i: number) => {
    return (
      <Grow
        in={props.loaded}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.min((i + 1) * 400, 2000)}
      >
        <div className={styles.target} key={item.id}>
          <Link className={styles.a} to={`/actor/${item.id}`}>
            <img src={url + item.img} />
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
