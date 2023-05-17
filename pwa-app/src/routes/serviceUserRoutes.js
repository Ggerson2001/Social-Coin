import { Route, Routes } from "react-router-dom";
import DetailScreen from "../Components/detailScreen";
import Create from "../admin/create";
import Edit from "../admin/edit";
import Test from "../Screens/home";

const ServiceUserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Test />} />
      <Route path="/post/:slug" element={<DetailScreen />} />
      <Route path="/admin/create" element={<Create />} />
      <Route path="/admin/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default ServiceUserRoutes;
