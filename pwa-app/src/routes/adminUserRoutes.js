import { Route, Routes } from "react-router-dom";
import Transfer from '../Screens/Transfer';
import MyTransactions from '../Screens/userTransactions';


const AdminUserRoutes = () => {
  return (
    <Routes>
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/mytransactions" element={<MyTransactions />} />
      
    </Routes>
  );
};

export default AdminUserRoutes;
