import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { url } from "../../common";
import style from "./EditActor.module.css";

const EditActor = (props: { actor: any }) => {
  const [dialog, setDialog] = useState(false);
  const [actor, setActor] = useState<any>({
    name: props.actor.name,
    biography: props.actor.biography,
    place: props.actor.place,
    born: props.actor.born.slice(0, 10),
    death: props.actor.death?.slice(0, 10),
    image: "",
  });
  const [errorForm, setErrorForm] = useState({
    biography: false,
  });

  const showDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const onChange = (e: any) => {
    setActor({ ...actor, [e.target.name]: e.target.value });
  };

  const onChangeImg = (e: any) => {
    setActor({ ...actor, [e.target.name]: e.target.files[0] });
  };

  const updateActor = async (e: any) => {
    e.preventDefault();

    if (actor.biography.length < 30) {
      setErrorForm({ ...errorForm, biography: true });
      return;
    }

    const formData = new FormData();

    for (let name in actor) {
      formData.append(name, actor[name]);
    }
    try {
      const res = await fetch(url + "/actor/" + props.actor.id, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.done) {
        setDialog(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        onClick={showDialog}
        variant="contained"
        style={{
          background: "#f1ccaa",
          borderRadius: "20px",
          padding: "3px",
          height: "min-content",
        }}
      >
        ✏️
      </Button>
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogTitle>Edit actor</DialogTitle>

        <DialogContent>
          <form className={style.form} onSubmit={updateActor}>
            <TextField
              onChange={onChange}
              name="name"
              label="Name"
              value={actor.name}
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="biography"
              label="Biography"
              value={actor.biography}
              error={errorForm.biography}
              multiline
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="place"
              label="Place"
              value={actor.place}
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="born"
              label="Born"
              type="date"
              value={actor.born}
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="death"
              helperText="Death, if is live, leave this empty"
              type="date"
              value={actor.death}
              fullWidth
            />

            <TextField
              name="image"
              onChange={onChangeImg}
              type="file"
              fullWidth
              helperText="If don't wanna change the cover photo leave this empty"
            />
            <Button type="submit" variant="contained" fullWidth>
              Confirm Edit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditActor;
