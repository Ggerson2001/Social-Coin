import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Loader from "../Components/Loader";
import Alert from "@mui/material/Alert";
import axiosInstance from "../utils/axios";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <TextField
    id="outlined-helperText"
    label={placeholder}
    value={value}
    onChange={(e) => {
      handleChange(e, name);
    }}
    type={type}
  />
);

const Transfer = () => {
  const {
    connectWallet,
    currentAccount,
    handleChange,
    sendTransaction,
    isLoading,
    isSuccess,
    balance,
  } = useContext(TransactionContext);
  let template;

  const url = window.location.href;
  const pathname = new URL(url).pathname;
  const pathParts = pathname.split("/");
  const post = pathParts[pathParts.length - 1];

  const [data, setData] = useState([]);
  const [metaAddress, setMetaAddress] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const [jobId, setJobId] = useState();

  useEffect(() => {
    axiosInstance.get(`job-verification/${post}/`).then((res) => {
      const formattedRows = res.data.map((row) => ({
        ...row,
        time_created: new Date(row.time_created).toLocaleDateString("en-GB"),
      }));
      setData(formattedRows);
      setMetaAddress(formattedRows[0].author_address);
      setJobId(formattedRows[0].job_post);
      setIsLoaded(true);
    });

    // eslint-disable-next-line
  }, []);

  if (!currentAccount) {
    template = (
      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>
    );
  } else {
    template = <Typography>Wallet is connected</Typography>;
  }

  const handleSubmit = (e) => {
    // const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    // if (!addressTo || !amount || !keyword || !message) return;
    console.log(jobId);
    sendTransaction(jobId);


  };

  return (
    <div>
      {template}
      <Typography>Balance: {balance}</Typography>
      <Container component="main" maxWidth="sm">
        <div>
          <Typography component="h1" variant="h5">
            Transfer Coins
          </Typography>
          {isLoaded && (
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                
                  <Input
                    placeholder="Address To"
                    name="addressTo"
                    
                    type="text"
                    handleChange={handleChange}
                  />
               
              </Grid>
              <Grid item xs={12}>
                <Input
                  placeholder="Amount (ETH)"
                  name="amount"
                  type="number"
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  placeholder="Enter Message"
                  name="message"
                  type="text"
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Send now
                </Button>
                {isSuccess ? (
                  <Alert severity="success">
                    Transaction is made succesfully!
                  </Alert>
                ) : (
                  <Typography></Typography>
                )}
              </div>
            )}
          </form>
           )}
        </div>
      </Container>
    </div>
  );
};

export default Transfer;
