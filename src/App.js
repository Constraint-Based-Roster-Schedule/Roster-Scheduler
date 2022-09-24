import React from 'react';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Router from './components/router';
import Sidebar from './components/sidebar';
import Login from './components/login'

function App() {
  return (
    <>
      {/* <Navbar/>
      <Sidebar/>
      <Router/>      */}
      <Login></Login>
      <Footer/>
    </>   
  );
}

export default App;
