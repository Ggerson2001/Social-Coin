import LoginScreen from './Screens/login'
import SignUpScreen from './Screens/signUp'
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/layout';
import Test from './Screens/home'
import Logout from './Screens/logout';
import DetailScreen from './Components/detailScreen';
import Create from './admin/create';
import Edit from './admin/edit';

function App() {
 

  return (
    <>
       <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/logout" element={<Logout />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Test />} />
          <Route path="/post/:slug" element={<DetailScreen />} />
          <Route path="/admin/create" element={<Create />} />
          <Route path="/admin/edit/:id" element={<Edit />} />
        ... other routes with layout ...
       </Route>
       
       </Routes>
    </>
 
  )
}

export default App

