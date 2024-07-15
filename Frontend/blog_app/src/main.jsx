import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Layout from './Layout';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    

    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Layout/>}/>
    </Routes>
    

      




    
    
    </BrowserRouter>   
  </React.StrictMode>
)
