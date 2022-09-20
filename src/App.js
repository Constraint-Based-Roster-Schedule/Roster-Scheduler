import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Router from './components/router';
import Sidebar from './components/sidebar';


function App() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Router/>     
      
    </>   
  );
}

export default App;
