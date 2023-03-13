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
      // eslint-disable-next-line
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      // eslint-disable-next-line
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: "",
    place: "",
    slug: "",
    description: "",
  });

  const [postData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);

  const handleChange = (e) => {
    // eslint-disable-next-line
      if ([e.target.name] == 'image') {
          setPostImage({
              image: e.target.files,
          });
          console.log(e.target.files);
      }
      // eslint-disable-next-line
      if ([e.target.name] == 'title') {
          updateFormData({
              ...postData,
              [e.target.name]: e.target.value.trim(),
              // eslint-disable-next-line
              ['slug']: slugify(e.target.value.trim()),
          });
      } else {
          updateFormData({
              ...postData,
              [e.target.name]: e.target.value.trim(),
          });
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('title', postData.title);
      formData.append('slug', postData.slug);
      formData.append('author', 10);
      formData.append('description', postData.description);
      formData.append('place', postData.place);
      formData.append('job_date','2022-04-03')
      formData.append('image', postimage.image[0]);

      axiosInstance.post(`admin/create/`, formData);
      navigate({
          pathname: '/home',
      });
    //   window.location.reload();

    // console.log(postimage.image[0])
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
                value={postData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/png, image/gif, image/jpeg"
                id="image"
                onChange={handleChange}
                name="image"
                type="file"
              />
            </Grid>
            <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create Post
          </Button>
            </Grid>
          </Grid>

         
         
        </form>
      </div>
    </Container>
  );
}
