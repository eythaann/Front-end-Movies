import { useState } from "react";
import style from "./AddMovie.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";

const AddMovie = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Movie
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Movie</DialogTitle>
        <DialogContent className={style.form}>
          <DialogContentText>Please fill all fields</DialogContentText>
          <TextField id="title" label="Movie's Name" fullWidth />
          <TextField multiline id="description" label="Description" fullWidth />
          <TextField
            id="premiere"
            label="premiere"
            type="date"
            defaultValue="2021-01-01"
          />
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(e: any) => {
              setRating(e.target.value);
            }}
          />
          <TextField type="file" fullWidth />
          <TextField label="Trailer Link" type="url" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMovie;
