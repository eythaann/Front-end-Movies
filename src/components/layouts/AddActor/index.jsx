import { useState } from "react";
import style from "./AddActor.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { url } from "../../common";

const AddActor = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    biography: "",
    born: "2021-01-01",
    death: null,
    place: "",
    image: "",
  });
  const [errorForm, setErrorForm] = useState({
    biography: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeImg = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const postmovie = async (e) => {
    e.preventDefault();
    if (form.biography.length < 30) {
      setErrorForm({ ...errorForm, biography: true });
      return;
    }

    const formData = new FormData();

    for (let name in form) {
      formData.append(name, form[name] === null ? null : form[name]);
    }
    try {
      const res = await fetch(url + "/actor", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.id) {
        setOpen(false);
        window.location.replace("/actor/" + data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} fullWidth variant="contained">
        Add New Actor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Actor</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill all fields</DialogContentText>
          <form onSubmit={postmovie} className={style.form}>
            <TextField
              required={true}
              name="name"
              value={form.name}
              onChange={onChange}
              label="Actor's Name"
              fullWidth
            />
            <TextField
              required
              name="place"
              value={form.place}
              onChange={onChange}
              multiline
              label="Place"
              fullWidth
            />
            <TextField
              required
              error={errorForm.biography}
              helperText="min length 30"
              minRows="2"
              name="biography"
              value={form.biography}
              onChange={onChange}
              multiline
              label="Biography"
              fullWidth
            />
            <TextField
              required
              name="born"
              value={form.born}
              onChange={onChange}
              label="Born"
              type="date"
            />
            <span> </span>
            <TextField
              name="death"
              value={form.death}
              onChange={onChange}
              type="date"
              helperText="Death: if is live, leave this empty"
            />
            <TextField
              required
              name="image"
              type="file"
              fullWidth
              onChange={onChangeImg}
            />
            <div>
              <Button type="submit" fullWidth variant="contained">
                Add Movie
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddActor;
