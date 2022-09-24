import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './home';
import About from './about';
import SignupForm from './signupForm';
import DoctorDashboard from './doctorDashboard';
import WardRoster from './wardRoster';
import ShiftRequest from './shiftRequest';
import Notifications from './notifications';
import RosterIndividual from './roster';
import Login from './login.jsx'

function router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signupForm' element={<SignupForm/>}/>
        <Route path='/doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='/wardRoster' element={<WardRoster/>}/>
        <Route path='/shiftRequest' element={<ShiftRequest/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/roster' element={<RosterIndividual/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='signupForm' element={<SignupForm/>}/>
        <Route path='doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='roster' element={<RosterIndividual/>}/>
        <Route path='wardRoster' element={<WardRoster/>}/>
        <Route path='shiftRequest' element={<ShiftRequest/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default router
