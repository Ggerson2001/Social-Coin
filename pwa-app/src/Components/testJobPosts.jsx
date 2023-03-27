import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ComplexGrid(props) {
  const { posts } = props;
  const navigate = useNavigate();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {posts.map((post) => {
          return (
            <Paper
              sx={{
                p: 2,

                maxWidth: 200,

                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Img alt="complex" src={post.image} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {post.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.status}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        {post.author}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      $19.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
    </Container>
  );
}
