import style from "./AddInterpretation.module.css";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Api, useDark } from "../../hooks";
import { url } from "../../common";

const AddInterpretations = (props: { actorId: string }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [form, setForm] = useState<any>({
    movieId: "",
    interpretation: "",
  });
  const dark = useDark();
  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  const onchange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    Api("/movies").then((data) => {
      setOptions(data);
    });
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    let i = form.movieId.lastIndexOf("id:");
    let temp = form.movieId.slice(i + 3);
    const form2 = {
      movieId: temp,
      actorId: props.actorId,
      interpretation: form.interpretation,
    };

    try {
      const res = await fetch(url + "/cast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form2),
      });

      const data = await res.json();
      if (data.alert) {
        alert(data.alert);
      }
      if (data.done) {
        setOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={dialogOpen} variant="outlined">
        + interpretations
      </Button>
      <Dialog open={open} onClose={dialogClose}>
        <DialogTitle style={dark ? { background: "#444", color: "#fff" } : {}}>
          Add interpretation
        </DialogTitle>
        <DialogContent
          style={dark ? { background: "#444", color: "#fff" } : {}}
        >
          <form onSubmit={submit} className={style.form}>
            <TextField
              style={dark ? { background: "#eaeaea", color: "#fff" } : {}}
              name="interpretation"
              label="interpretation"
              value={form.interpretation}
              onChange={onchange}
              required
              fullWidth
            />
            <Autocomplete
              style={dark ? { background: "#eaeaea", color: "#fff" } : {}}
              value={form.movieId}
              onChange={(event: any, newValue: string | null) => {
                setForm({ ...form, movieId: newValue });
              }}
              options={options.map(
                (option: any) => option.title + " id:" + option.id
              )}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} required label="Movie Title" />
              )}
            />
            <div>
              <Button type="submit" fullWidth variant="contained">
                Add Interpretation
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions
          style={dark ? { background: "#444", color: "#fff" } : {}}
        >
          <Button onClick={dialogClose} style={dark ? { color: "#fff" } : {}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddInterpretations;
