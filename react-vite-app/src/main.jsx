import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './Screens/Dashboard';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
     
     <App />
     
     
     </BrowserRouter>
    
  </React.StrictMode>,
)
