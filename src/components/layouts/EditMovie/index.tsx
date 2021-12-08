import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { url } from "../../common";
import { Api } from "../../hooks";
import style from "./EditMovie.module.css";

const EditMovie = (props: { movie: any }) => {
  const [dialog, setDialog] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [movie, setMovie] = useState<any>({
    title: props.movie.title,
    description: props.movie.description,
    premiere: props.movie.premiere.slice(0, 10),
    rating: props.movie.rating,
    trailerLink: props.movie.trailerLink,
    gener: props.movie.gener,
    duration: props.movie.duration,
    image: "",
  });
  const [errorForm, setErrorForm] = useState({
    description: false,
  });

  useEffect(() => {
    Api("/geners").then((data) => {
      setOptions(data);
    });
  }, []);

  const showDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const onChange = (e: any) => {
    if (e.target.name === "rating") {
      setMovie({ ...movie, [e.target.name]: Number(e.target.value) });
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value });
    }
  };

  const onChangeImg = (e: any) => {
    setMovie({ ...movie, [e.target.name]: e.target.files[0] });
  };

  const updateMovie = async (e: any) => {
    e.preventDefault();

    if (movie.description.length < 30) {
      setErrorForm({ ...errorForm, description: true });
      return;
    }

    const formData = new FormData();

    for (let name in movie) {
      formData.append(name, movie[name]);
    }
    try {
      const res = await fetch(url + "/movie/" + props.movie.id, {
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
        <DialogTitle>Edit Movie</DialogTitle>

        <DialogContent>
          <form className={style.form} onSubmit={updateMovie}>
            <TextField
              onChange={onChange}
              name="title"
              label="Title"
              value={movie.title}
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="description"
              label="Description"
              value={movie.description}
              error={errorForm.description}
              multiline
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="premiere"
              label="Premiere"
              type="date"
              value={movie.premiere}
              fullWidth
              required
            />
            <Rating name="rating" value={movie.rating} onChange={onChange} />
            <TextField
              name="image"
              onChange={onChangeImg}
              type="file"
              fullWidth
              helperText="If don't wanna change the cover photo leave this empty"
            />
            <Autocomplete
              options={options.map((option: any) => option.tag)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  name="gener"
                  onSelect={onChange}
                  onChange={onChange}
                  value={movie.gener}
                  label="Gener"
                  type="search"
                />
              )}
            />
            <TextField
              required
              name="duration"
              value={movie.duration}
              label="Duration in Minutes"
              type="number"
              fullWidth
              onChange={onChange}
            />
            <TextField
              onChange={onChange}
              label="Trailer Link"
              name="trailerLink"
              value={movie.trailerLink}
              type="url"
              fullWidth
              required
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

export default EditMovie;
