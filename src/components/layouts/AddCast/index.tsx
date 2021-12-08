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
import { Api } from "../../hooks";
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
        <DialogTitle>Add interpretation</DialogTitle>
        <DialogContent>
          <form onSubmit={submit} className={style.form}>
            <TextField
              name="interpretation"
              value={form.interpretation}
              onChange={onchange}
              required
            />
            <Autocomplete
              options={options.map(
                (option: any) => option.name + " id:" + option.id
              )}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  name="actorId"
                  onSelect={onchange}
                  onChange={onchange}
                  value={form.actorId}
                  label="Actor's Name"
                  type="search"
                />
              )}
            />
            <div>
              <Button type="submit" fullWidth variant="contained">
                Add Interpretation
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCast;
