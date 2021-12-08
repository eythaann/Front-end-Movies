import { Button } from "@mui/material";
import { url } from "../../common";

const DeleteActor = (props) => {
  const del = async () => {
    try {
      const res = await fetch(url + "/movie/" + props.movieId, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      //redirect to movies page
      window.location.replace("/movies");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      onClick={del}
      style={{ borderRadius: "15px", padding: "3px", height: "min-content" }}
      variant="contained"
      color="error"
    >
      X
    </Button>
  );
};

export default DeleteActor;
