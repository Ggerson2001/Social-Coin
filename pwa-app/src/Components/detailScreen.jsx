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
import MyModal from "./modal";
import { TransactionContext } from "../context/TransactionContext";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "../redux/actions";

export default function Post() {
  const { verifyJob } = useContext(TransactionContext);
  const { slug } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.url);
  



  const navigate = useNavigate();
  const jobSlug = window.location.pathname.split("/").pop();
  const userId = localStorage.getItem("id");

  const [data, setData] = useState({ posts: [] });
  const [jobId, setJobId] = useState(0);
  const [metaAddress, setMetaAddress] = useState();
  const [published, setPublished] = useState();

  const role = localStorage.getItem("role");

  useEffect(() => {
    axiosInstance.get("post/" + slug).then((res) => {
      setData(res.data);
      setJobId(res.data.id);
      setPublished(res.data.published);
      
    });



    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    dispatch(setUrl(window.location.href));
  }, [dispatch]);
  
    useEffect(() => {
      if(role=='admin' && metaAddress!==undefined){
      axiosInstance.get(`job-verification/${jobSlug}/`).then((res) => {
        const formattedRows = res.data.map((row) => ({
          ...row,
          time_created: new Date(row.time_created).toLocaleDateString("en-GB"),
        }));
  
        setMetaAddress(formattedRows[0].author_address);
      });
    }
  
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

  const openModal = (type) => {
    setModalContent({ type, message: "Job is not completed from any client" });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  const handleUpdate = () => {
    axiosInstance.patch(`admin/edit/${jobId}/`, {
      status: "done",
      slug: slug,
      published: published,
    });

    window.location.reload();
  };

  const verifyUpdate = async () => {
    try {
      if (metaAddress !== undefined) {
        await verifyJob(
          "0x9DDac21Af7c85F417D0deF8fDF0515c8432D4431",
          metaAddress,
          jobId
        );

        setTimeout(() => {
          handleUpdate();
        }, 10000);
      } else {
        openModal("error");
      }
    } catch (error) {
      console.log(error);
      // Handle the error
    }
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
                <Typography
                  variant="body2"
                  color={data.status === "done" ? "green" : "red"}
                >
                  Status:{data.status === "done" ? "Verified" : "Unverified"}
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
              ></List>

              {role === "admin" ? (
                <div>
                  <Button
                    variant="contained"
                    onClick={() => verifyUpdate()}
                    disabled={data.status === "done"}
                  >
                    Verify job to blockchain
                  </Button>
                </div>
              ) : (
                <p></p>
              )}

              {role === "client" ? (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={data.status === "done"}
                  onClick={handleSubmit}
                >
                  Verify Job
                </Button>
              ) : (
                <p></p>
              )}

              <MyModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                type={modalContent.type}
                message={modalContent.message}
              />
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "10",
                }}
              ></Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {role === "admin" ? (
        <div>
          <Typography gutterBottom variant="h5" component="div">
            Job completed from
          </Typography>
          <div style={{ margin: "16px 0" }}>
            <Table />
          </div>
          <Button
            variant="contained"
            disabled={data.status === "undone"}
            onClick={() => navigate(`/transfer/${jobSlug}`)}
          >
            Transfer Coins
          </Button>
        </div>
      ) : (
        <p></p>
      )}

      {role === "service" ? (
        <div>
         <QrCode urlProp={url} />
        </div>
      ) : (
        <p></p>
      )}
    </Container>
  );
}
