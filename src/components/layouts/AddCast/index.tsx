import style from "./AddCast.module.css";
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

const AddCast = (props: { movieId: string }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [form, setForm] = useState<any>({
    actorId: "",
    interpretation: "",
  });

  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  const onchange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    Api("/actors").then((data) => {
      setOptions(data);
    });
  }, []);

  const dark = useDark();

  const submit = async (e: any) => {
    e.preventDefault();
    let i = form.actorId.lastIndexOf("id:");
    let temp = form.actorId.slice(i + 3);
    const form2 = {
      movieId: props.movieId,
      actorId: temp,
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
        + cast
      </Button>
      <Dialog open={open} onClose={dialogClose}>
        <DialogTitle style={dark ? { background: "#444", color: "#fff" } : {}}>
          Add cast
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
              value={form.actorId}
              onChange={(event: any, newValue: string | null) => {
                setForm({ ...form, actorId: newValue });
              }}
              options={options.map(
                (option: any) => option.name + " id:" + option.id
              )}
              fullWidth
              renderInput={(params: any) => (
                <TextField {...params} required label="Actor's Name" />
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

export default AddCast;
