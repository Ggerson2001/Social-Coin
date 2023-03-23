import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
// import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Loader from '../Components/Loader';
import Alert from '@mui/material/Alert';

const Input = ({ placeholder, name, type, value, handleChange }) => (
 

    <TextField
          id="outlined-helperText"
          label={placeholder}
          value={value}
          onChange={(e)=>{handleChange(e,name)}}
          type={type}
          
        />
  );

const Transfer=()=>{
const{connectWallet,currentAccount,handleChange,sendTransaction,isLoading,isSuccess}=useContext(TransactionContext);
let template;

if(!currentAccount){
  template=<Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
}else{
  template=<Typography>Wallet is connected</Typography>
}



const handleSubmit = (e) => {
  // const { addressTo, amount, keyword, message } = formData;

  e.preventDefault();

  
  // if (!addressTo || !amount || !keyword || !message) return;
  

  sendTransaction();
};

return(

<div>


  {template}  




<Container component="main" maxWidth="sm">

<div >
    <Typography component="h1" variant="h5">
        Transfer Coins 
    </Typography>
    <form  noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} /> 
            </Grid>
            <Grid item xs={12}>
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            </Grid>
          
            <Grid item xs={12}>
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            </Grid>
       
        </Grid>
        {isLoading
              ? <Loader />
              : ( 
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
                {isSuccess?<Alert severity="success">Transaction is made succesfully!</Alert>:(
                  <Typography></Typography>
                )}
                
                </div>

             )}
    </form>
</div>
</Container>

 

</div>

)

}

export default Transfer;