import { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "../utils/axios";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const jobSlug = window.location.pathname.split('/').pop(); 
  const [userName, setUserName] = useState();


  useEffect(() => {
    axiosInstance.get(`job-verification/${jobSlug}/`).then((res) => {
      const formattedRows = res.data.map((row) => ({
        ...row,
        time_created: new Date(row.time_created).toLocaleDateString("en-GB"),
      }));
      setRows(formattedRows);
      setUserName(formattedRows[0].author_name);
      
      
    });

      
    // eslint-disable-next-line
  }, []);



 

  return (
    <TableContainer component={Paper} sx={{ width: "40%" }}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {userName}
              </TableCell>
              <TableCell align="right">{row.time_created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}