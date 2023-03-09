import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axios";
import { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton } from "@mui/material";

export default function Create() {
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: "",
    place:"",
    slug: "",
    description: "",
    
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    if ([e.target.name] == "title") {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        ["slug"]: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`admin/create/`, {
        title: formData.title,
        place:formData.place,
        job_date:"2023-03-25",
        slug: formData.slug,
        author: 10,
        description: formData.description,
        status:"undone"
        
      })
      .then((res) => {
        navigate("/home");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Create New Post
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Post Title"
                name="title"
                autoComplete="title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="place"
                label="Job Location:"
                name="place"
                autoComplete="location"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="slug"
                label="slug"
                name="slug"
                autoComplete="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
          
       
          
        {/* <img src={postData.image} alt={''}/> */}
        
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create Post1
          </Button>
        </form>
      </div>
    </Container>
  );
}
