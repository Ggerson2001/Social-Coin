import LoginScreen from './Screens/Login'
import SignUpScreen from './Screens/SignUp'
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Test from './Screens/Test'
import Test2 from './Screens/Test2'
import Logout from './Screens/Logout';


function App() {
 

  return (
    <>
       <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/logout" element={<Logout />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Test />} />
          <Route path="/test" element={<Test2 />} />
        ... other routes with layout ...
       </Route>
       
       </Routes>
    </>
 
  )
}

export default App

