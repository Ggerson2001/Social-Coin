import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import axiosInstance from "../utils/axios";
import logo from "../assets/minilogo192.png";

const Posts = (props) => {
  const { posts } = props;
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  function deleteObject(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Save it!
      axiosInstance
        .delete("admin/delete/" + id)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then(function () {
          navigate({
            pathname: "/home",
          });
          window.location.reload();
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  }

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {posts.map((post) => {
          return (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={post.id} xs={12} md={4} data-testid="post">
              <Card key={post.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.image}
                  alt="job"
                />
                <CardContent
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography variant="h7" color="text.secondary">
                      ID: {post.id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>

                    <Typography variant="h7" color="text.secondary">
                      Reward: {post.reward} <img src={logo} alt="test" />
                    </Typography>
                  </div>
                  <Typography
                    variant="body3"
                    color={post.status === "done" ? "green" : "red"}
                  >
                    {post.status === "done" ? "Verified" : "Unverified"}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    onClick={() => navigate("/post/" + post.slug)}
                    data-testid="view-post"
                  >
                    View
                  </Button>

                  {role === "admin" || role === "service" ? (
                    <div>
                      <Button
                        size="small"
                        onClick={() => navigate("/edit/" + post.id)}
                        data-testid="edit-post"
                      >
                        Edit
                      </Button>
                      <Tooltip title="Delete">
                      <Button
                        size="small"
                        onClick={() => deleteObject(post.id)}
                        sx={{ color: "error.main" }}
                        data-testid="delete-post"
                      >
                        <DeleteIcon />
                        
                      </Button>
                      </Tooltip>
                    </div>
                  ) : (
                    <p></p>
                  )}
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
