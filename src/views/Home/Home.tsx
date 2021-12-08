import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Just a Page of Info
  return (
    <div className="container">
      <div className="content">
        <h1>Home</h1>
        <p>This page is a App that we can use to Add Movies and Actors.</p>
        <p>
          You can <b>Search, Add, Modify and Delete</b> its.
        </p>
        <p>For do it go to the next links:</p>
        <br />
        <Link to="/movies">Go to Movies</Link>
        <Link to="/actors">Go to Actors</Link>
      </div>
    </div>
  );
};

export default Home;
