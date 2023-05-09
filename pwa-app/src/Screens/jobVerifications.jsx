import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { TransactionContext } from "../context/TransactionContext";
const columns = [
  { field: "id", headerName: "Verification ID", width: 140 },
  { field: "lg", headerName: "Verified from", width: 130 },
  { field: "client", headerName: "Client address", width: 130 },
  {
    field: "jobId",
    headerName: "JobId",
    width: 120,
  },
];

export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export default function DataTable() {
  const { verifications } = useContext(TransactionContext);
  let verificationId = 1;

  useEffect(() => {
    const rows = verifications
      .slice()
      .reverse()
      .map((verification) => ({
        id: verificationId++,
        lg: verification.lg,
        client: shortenAddress(verification.client),
        jobId: verification.jobId,
      }));

    // eslint-disable-next-line
  }, []);

  const rows = verifications
    .slice()
    .reverse()
    .map((verification) => ({
      id: verificationId++,
      lg: shortenAddress(verification.lg),
      client: shortenAddress(verification.client),
      jobId: verification.jobId,
    }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Verified Jobs in Ethereum Network</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
