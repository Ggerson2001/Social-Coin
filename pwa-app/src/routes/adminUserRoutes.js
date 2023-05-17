import { Route, Routes } from "react-router-dom";
import Transfer from "../Screens/Transfer";
import MyTransactions from "../Screens/userTransactions";

const AdminUserRoutes = () => {
  return (
    <Routes>
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/mytransactions" element={<MyTransactions />} />
      <Route path="/home" element={<Test />} />
      <Route path="/post/:slug" element={<DetailScreen />} />
      <Route path="/admin/create" element={<Create />} />
      <Route path="/admin/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default AdminUserRoutes;
