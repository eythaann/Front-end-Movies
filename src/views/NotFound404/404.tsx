import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="container">
      <div className="content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1>404</h1>
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
