import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './home';
import About from './about';
import SignupForm from './signupForm';
import DoctorDashboard from './doctorDashboard';
import Roster from './roster';

function router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='signupForm' element={<SignupForm/>}/>
        <Route path='doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='roster' element={<Roster/>}/>
      </Routes>
    </div>
  )
}

export default router
