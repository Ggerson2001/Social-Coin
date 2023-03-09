import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axios";

const Posts = (props) => {
  const { posts } = props;
  const navigate = useNavigate();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosInstance
//         .delete('admin/delete/' + id)
//         .catch(function (error) {
//             if (error.response) {
//                 console.log(error.response.data);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//             }
//         })
//         .then(function () {
//                 navigate({
//                     pathname: '/home',
//                 });
//                 window.location.reload();
//         });
// };

function deleteObject (id){
    if (window.confirm('Are you sure you want to delete this post?')) {
        // Save it!
        axiosInstance
        .delete('admin/delete/' + id)
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
        .then(function () {
                navigate({
                    pathname: '/home',
                });
                window.location.reload();
        });
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }
   
}
 
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {posts.map((post) => {
          return (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={post.id} xs={12} md={4}>
              <Card key={post.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.image}
                  alt="job"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/post/'+ post.slug)}>View</Button>
                  <Button size="small" onClick={() => navigate('/admin/edit/'+ post.id)}>Edit</Button>
                  <Button size="small" onClick={() => deleteObject(post.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default Posts;
