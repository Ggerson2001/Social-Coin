import LoginScreen from './Screens/Login'
import SignUpScreen from './Screens/SignUp'
import Home from './Screens/Dashboard'
import { Routes, Route } from 'react-router-dom';

function App() {
 

  return (
    <>
       <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/home" element={<Home />} />
       
       </Routes>
    </>
 
  )
}

export default App
