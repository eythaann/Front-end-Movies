import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDark } from "../../components/hooks";

const NotFound404 = () => {
  const dark = useDark();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="container"
      style={dark ? { background: "#333", color: "#fff" } : {}}
    >
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
