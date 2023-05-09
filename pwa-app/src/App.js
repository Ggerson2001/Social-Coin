import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signUp";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/layout";
import Test from "./Screens/home";
import Logout from "./Screens/logout";
import Transfer from "./Screens/Transfer";
import MyTransactions from "./Screens/userTransactions";
import PrivateRoutes from "./routes/privateRoutes";
import DetailScreen from "./Components/detailScreen";
import Create from "./admin/create";
import Edit from "./admin/edit";
import VerifiedJobs from "./Screens/jobVerifications";
import ClientVerification from "./Screens/clientVerification";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
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
