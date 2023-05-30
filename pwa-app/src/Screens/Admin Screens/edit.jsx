import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axiosInstance from "../../utils/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
const { id } = useParams();

// Define initial form data state
const initialFormData = Object.freeze({
  id: "",
  title: "",
  place: "",
  description: "",
  slug: "",
});

// Set up state variables
const [formData, updateFormData] = useState(initialFormData);

// Fetch job post details from the server when the component mounts
useEffect(() => {
  axiosInstance.get("jobpost/detail/" + id).then((res) => {
    // Update form data state with the fetched details
    updateFormData({
      ...formData,
      title: res.data.title,
      description: res.data.description,
      slug: res.data.slug,
      place: res.data.place,
      job_date: res.data.job_date,
      author: res.data.author,
      status: res.data.status,
      reward: res.data.reward,
    });
    console.log(res.data);
  });
  // eslint-disable-next-line
}, [updateFormData]);

// Event handler for form input changes
const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value.trim(),
  });
};

// Event handler for form submission
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);

  // Send a PUT request to update the job post details
  axiosInstance.put(`jobpost/edit/` + id + "/", {
    title: formData.title,
    place: formData.place,
    job_date: formData.job_date,
    slug: formData.slug,
    author: 10,
    description: formData.description,
    status: "undone",
    reward: formData.reward,
  });

  // Navigate to the home page
  navigate({
    pathname: "/home",
  });
};


  return (
    <Container component="main" maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          Edit Post
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
                value={formData.title}
                onChange={handleChange}
              />
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
                value={formData.description}
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
                id="reward"
                label="Reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                multiline
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
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="place"
                label="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="job_date"
                label="Job_date"
                name="job_date"
                value={formData.job_date}
                onChange={handleChange}
                multiline
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Update Post
          </Button>
        </form>
      </div>
    </Container>
  );
}
