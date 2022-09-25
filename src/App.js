import React from 'react';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Router from './components/router';
import Sidebar from './components/sidebar';

import Login from './components/login'

import Axios from 'axios';



function App() {
  const a= ()=>{
    return Axios({
    method: "POST",
    url: "http://localhost:3500/testAPI",
    data:{
      firstName:"abc",
    },
  })
  }
  return (
    <>

      {/* <Navbar/>
      <Sidebar/>
      <Router/>      */}
      {/* <Login></Login>
      <Footer/>

      <Navbar/> */}
      {/* <button type='button' onClick={a}>hi</button> */}
      <Router/>     
      

    </>   
  );
}

export default App;
