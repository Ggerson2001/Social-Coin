import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { TransactionContext } from "../context/TransactionContext";
const columns = [
  { field: "id", headerName: "Transaction ID", width: 140 },
  { field: "sentAccount", headerName: "From", width: 130 },
  { field: "receiveAccount", headerName: "To", width: 130 },
  {
    field: "amount",
    headerName: "Amount (Eth)",
    width: 120,
  },
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 180,
  },
  {
    field: "jobId",
    headerName: "JobId",
    width: 180,
  },
];

export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export default function DataTable() {
  const { transactions, currentAccount } = useContext(TransactionContext);
  let transactionId = 1;

  console.log(transactions);
  const rows = transactions
    .slice()
    .reverse()
    .map((transaction) => ({
      id: transactionId++,
      sentAccount: shortenAddress(transaction.addressFrom),
      receiveAccount: shortenAddress(transaction.addressTo),
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      jobId:transaction.jobId
    }));

  return (
    <div style={{ height: 400, width: "100%" }}>
     <h1>My Transactions</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
