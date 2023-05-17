import LoginScreen from "./Screens/Login/login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/dashboardLayout";
import Test from "./Screens/Home Screen/home";
import Logout from "./Screens/Login/logout";
import Transfer from "./Screens/Admin Screens/Transfer";
import MyTransactions from "./Screens/Admin Screens/userTransactions";
import PrivateRoutes from "./routes/privateRoutes";
import DetailScreen from "./Components/DetailScreen/detailScreen";
import Create from "./Screens/Admin Screens/create";
import Edit from "./Screens/Admin Screens/edit";
import VerifiedJobs from "./Screens/Admin Screens/jobVerifications";
import ClientVerification from "./Screens/clientCompletedPosts";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Test />} />
            <Route path="/transfer/:slug" element={<Transfer />} />
            <Route path="/mytransactions" element={<MyTransactions />} />
            <Route path="/verifiedJobs" element={<VerifiedJobs />} />
            <Route path="/jobs/verifiedJobs" element={<ClientVerification />} />

            <Route path="/post/:slug" element={<DetailScreen />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
          ... other routes with layout ...
        </Route>
      </Routes>
    </>
  );
}

export default App;
