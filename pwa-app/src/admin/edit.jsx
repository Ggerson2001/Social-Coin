import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axios";
import { useState ,useEffect} from "react";
import { useParams } from 'react-router-dom';
export default function Edit() {


  const navigate = useNavigate();
  const {id}=useParams();
  const initialFormData = Object.freeze({
    id: '',
    title: '',
    place: '',
    description: '',
    slug: "",
    
});

const [formData, updateFormData] = useState(initialFormData);


useEffect(() => {
    axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
        updateFormData({
            ...formData,
            'title': res.data.title,
            'description': res.data.description,
            'slug': res.data.slug,
            'place': res.data.place,
            'job_date': res.data.job_date,
            'author': res.data.author,
            'status': res.data.status,
        });
        console.log(res.data);
    });
    // eslint-disable-next-line
}, [updateFormData]);

const handleChange = (e) => {
    updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.put(`admin/edit/` + id + '/', {
        title: formData.title,
        place:formData.place,
        job_date:formData.job_date,
        slug: formData.slug,
        author: 10,
        description: formData.description,
        status:'undone'
        
    });
    navigate({
        pathname: '/home',
    });
    window.location.reload();
};

return (
    <Container component="main" maxWidth="sm">

        <div >
            <Typography component="h1" variant="h5">
                Edit Post
            </Typography>
            <form  noValidate>
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
                            id="slug"
                            label="slug"
                            name="slug"
                            autoComplete="slug"
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
                            autoComplete="content"
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
                            label="job_date"
                            name="job_date"
                            autoComplete="date"
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