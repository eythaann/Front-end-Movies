import styles from "./Actors.module.css";
import { useEffect, useState } from "react";
import { Api, useDark, useForceUpdate } from "../../components/hooks";
import { Link } from "react-router-dom";
import { publicFolder } from "../../components/common";
import { Button, Grow, Skeleton, TextField } from "@mui/material";
import { AddActor } from "../../components/layouts";

let cache: any = [];

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const force = useForceUpdate();
  useEffect(() => {
    window.scrollTo(0, 0);
    Api("/actors").then((data) => {
      if (data !== undefined) {
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

  const orderAsc = () => {
    cache.sort((a: any, b: any) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    setActors(cache);
    force();
  };

  const orderDsc = () => {
    cache.sort((a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
    setActors(cache);
    force();
  };
  const dark = useDark();
  return (
    <div
      className="container"
      style={dark ? { background: "#333", color: "#fff" } : {}}
    >
      <div className="content">
        <h1>Actors</h1>
        <div className={styles.content}>
          {loaded ? (
            <Grow
              in={loaded}
              style={{ transformOrigin: "0 0 0" }}
              timeout={600}
            >
              <div className={styles.menu}>
                <TextField
                  style={dark ? { background: "#999", color: "#fff" } : {}}
                  label="Search"
                  fullWidth
                  type="search"
                  onChange={search}
                />
                <Button onClick={orderAsc}>Order By Name Asc</Button>
                <Button onClick={orderDsc}>Order By Name Dsc</Button>
                <p>Don`t found a Actor? Add it!</p>
                <AddActor />
              </div>
            </Grow>
          ) : (
            <div className={styles.menu}>
              <Skeleton height="60px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
            </div>
          )}

          <ActorsList loaded={loaded} actors={actors} />
        </div>
      </div>
    </div>
  );
};
//This is the principal Actors List
const ActorsList = (props: any): JSX.Element => {
  const dark = useDark();
  //while the data is loading show a Skeletont Layer
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

  //when the data is totally loaded show the movie List
  const list = props.actors.map((item: any, i: number) => {
    return (
      <Grow
        in={props.loaded}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.min((i + 1) * 400, 2000)}
        key={item.id}
      >
        <div
          className={styles.target}
          style={dark ? { background: "#444", color: "#fff" } : {}}
        >
          <Link className={styles.a} to={`/actor/${item.id}`}>
            <img src={publicFolder + item.img} alt={item.name} />
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
