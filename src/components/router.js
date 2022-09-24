import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './home';
import About from './about';
import SignupForm from './signupForm';
import DoctorDashboard from './doctorDashboard';
import WardRoster from './wardRoster';
import ShiftRequest from './shiftRequest';
<<<<<<< HEAD
import Notifications from './notifications';
import RosterIndividual from './roster';
=======
import Login from './login.jsx'
>>>>>>> 151e18e64e3ef85b57d3cb4ee7d340a3ebbf1528

function router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
<<<<<<< HEAD
        <Route path='/about' element={<About/>}/>
        <Route path='/signupForm' element={<SignupForm/>}/>
        <Route path='/doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='/wardRoster' element={<WardRoster/>}/>
        <Route path='/shiftRequest' element={<ShiftRequest/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/roster' element={<RosterIndividual/>}/>
=======
        <Route path='about' element={<About/>}/>
        <Route path='signupForm' element={<SignupForm/>}/>
        <Route path='doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='roster' element={<RosterIndividual/>}/>
        <Route path='wardRoster' element={<WardRoster/>}/>
        <Route path='shiftRequest' element={<ShiftRequest/>}/>
        <Route path='login' element={<Login/>}/>
>>>>>>> 151e18e64e3ef85b57d3cb4ee7d340a3ebbf1528
      </Routes>
    </div>
  )
}

export default router
