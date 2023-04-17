import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axios";
import { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { integerPropType } from "@mui/utils";

export default function Verification() {
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return (
      string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        // eslint-disable-next-line
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        // eslint-disable-next-line
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "")
    ); // Trim - from end of text
  }

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    author: 10,
    job_post: 17,
  });

  const [postData, updateFormData] = useState(initialFormData);


  const handleChange = (e) => {

    // eslint-disable-next-line
  
      updateFormData({
        ...postData
      });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("author", initialFormData.author);
    formData.append("job_post", initialFormData.job_post);


    axiosInstance.post(`create-job-verification/test/`, formData);
    navigate({
      pathname: "/home",
    });
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
     
        <form noValidate>
          <Grid container spacing={2}>
     
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Verify Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


