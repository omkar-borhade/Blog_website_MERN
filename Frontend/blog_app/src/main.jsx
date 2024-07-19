import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { store, persistor } from './redux/store.js';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';
axios.defaults.baseURL="http://localhost:3000"
axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    

    <BrowserRouter>
    <ThemeProvider>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
      

      
    </Routes>
    <Footer/>
    </ThemeProvider>
    </BrowserRouter>   
  </Provider>
  </PersistGate>
);
