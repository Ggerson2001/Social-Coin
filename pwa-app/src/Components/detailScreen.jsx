import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../Components/table";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/minilogo192.png";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import List from "@mui/material/List";

import Grid from "@mui/material/Grid";

import QrCode from "./qrCode";
import Verification from "../Screens/verification";


export default function Post() {
  const { slug } = useParams();
  const search = window.location.search;
  const navigate = useNavigate();

  const [data, setData] = useState({ posts: [] });
  const role = localStorage.getItem("role");

  useEffect(() => {
    axiosInstance.get("post/" + slug).then((res) => {
      setData(res.data);
      console.log(role);
    });
    console.log(search);
    // eslint-disable-next-line
  }, []);


  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <Container align="left">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Card sx={{ Width: 345, height: "min-content", padding: 5 }}>
            <Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {data.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Address: {data.place}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Posted on :{formatDate(data.published)}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Status :{data.status}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Reward :{data.reward} <img src={logo} alt="test" />
                </Typography>
              </CardContent>
              <List
                sx={{
                  listStyleType: "disc",
                  pl: 2,
                  "& .MuiListItem-root": {
                    display: "list-item",
                  },
                }}
              >
                {/* <ListItem color="text.secondary">
                        You are able to create a properly readable and
                        functioning Java program, given a certain specification.
                      </ListItem> */}
              </List>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "10",
                }}
              >
                {/* <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                        //   onClick={(event) =>
                        //     ()
                        //   }
                          sx={{ width: 40 }}
                        >
                          Edit
                        </Button>
                      </Grid> */}
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {role === "admin" ? (
        <div>
          <Typography gutterBottom variant="h5" component="div">
            Job verified from
          </Typography>
          <Table />
          <Button variant="contained" onClick={() => navigate("/transfer")}>
            Transfer Coins
          </Button>
        </div>
      ) : (
        <p></p>
      )}

      {role === "service" ? (
        <div>
          <QrCode />
        </div>
      ) : (
        <p></p>
      )}

      {role === "client" ? (
        <div>
          <Verification />
        </div>
      ) : (
        <p></p>
      )}
    </Container>
  );
}
