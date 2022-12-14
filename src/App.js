import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Router from './components/router';
import authService from './auth_service/auth_services';

import Axios from 'axios';
import Sidebar from './components/sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import { ImportExportTwoTone } from '@mui/icons-material';

import Footer from './components/footer'




function App() {
  
  const [type, setType] = useState('');

  useEffect(()=>{
    setType(authService.getUserType())
  },[type])




  return (
    <>

      {/* <Navbar/> */}
     
      <Router type={type}/>     
      
      {/* <Footer/> */}

    </>   
  );
}

export default App;
