import React, { useContext } from "react";
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
import { TransactionContext } from "../context/TransactionContext";

export default function Post() {

  const {verifyJob
  } = useContext(TransactionContext);
  const { slug } = useParams();

  const navigate = useNavigate();
  const jobSlug = window.location.pathname.split("/").pop();
  const userId = localStorage.getItem("id");

  const [data, setData] = useState({ posts: [] });
  const [jobId, setJobId] = useState(0);

  const role = localStorage.getItem("role");

  useEffect(() => {
    axiosInstance.get("post/" + slug).then((res) => {
      setData(res.data);
      setJobId(res.data.id);
    });

   

    // eslint-disable-next-line
  }, []);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const initialFormData = {
    author: userId,
    job_post: jobId,
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("author", initialFormData.author);
    formData.append("job_post", initialFormData.job_post);


    axiosInstance.post(`create-job-verification/${jobSlug}/`, formData);


    console.log(formData);
    navigate({
      pathname: "/home",
    });
  };


  const handleVerification = (e) => {
    e.preventDefault();
    
    verifyJob('0xAF36996A59B4749aAaA5211B495b2de686A09933',initialFormData.job_post);

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
            Job completed from
          </Typography>
          <Table />

          <Button variant="contained" onClick={handleVerification}>
            Verify Job to Blockchain
          </Button>

          &nbsp;&nbsp;&nbsp;&nbsp;

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Verify Job
          </Button>
        </div>
      ) : (
        <p></p>
      )}
    </Container>
  );
}
