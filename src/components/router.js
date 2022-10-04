import React from "react";
import { Routes, Route, BrowserRouter, Protected } from "react-router-dom";
import Home from "./home";
import About from "./about";
import SignupForm from "./signupForm";
import DoctorDashboard from "./doctorDashboard";
import WardRoster from "../view/wardRoster";
import ShiftRequest from "./shiftRequest";
import Notifications from "./notifications";
import Login from "./login";
import RosterIndividual from "../view/roster";
import DocotrProfile from "./doctorProfile";
import HomePage from "./home";
import ConsultantDashboard from "./consultantDashboard";
import AdminDashboard from "./adminDashboard";
import ConsultantProfile from "./consultantProfile";
import LeaveRequests from "../view/leaveRequests";
import Navbar from "./navbar";
import { useEffect } from "react";
import ProtectedRoute from "./protectedRoute";
import Logout from "./logout";
import NotFound from "./notFound";

function Router(props) {
  
  useEffect(()=>{}, [props.type])

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signupForm" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
        
            <Route exact path="/doctor" element={<Navbar />}>
              <Route path="" element={<ProtectedRoute permissions={'1'}> <DoctorDashboard /> </ProtectedRoute>} />
              <Route path="roster" element={<ProtectedRoute permissions={'1'}><RosterIndividual /></ProtectedRoute>} />
              <Route path="wardRoster" element={<ProtectedRoute permissions={'1'}><WardRoster /></ProtectedRoute>} />
              <Route path="shiftRequest" element={<ProtectedRoute permissions={'1'}><ShiftRequest /></ProtectedRoute>} />
              <Route path="notifications" element={<ProtectedRoute permissions={'1'}><Notifications /></ProtectedRoute>} />
              <Route path="leaveRequests" element={<ProtectedRoute permissions={'1'}><LeaveRequests /></ProtectedRoute>} />
              <Route path="doctorProfile" element={<ProtectedRoute permissions={'1'}><DocotrProfile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          
            <Route exact path="/consultant" element={<Navbar />}>
              <Route path="" element={<ProtectedRoute permissions={'2'}><ConsultantDashboard /></ProtectedRoute>} />
              <Route path="consultantProfile" element={<ProtectedRoute permissions={'2'}><ConsultantProfile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
         
            <Route exact path="/admin" element={<Navbar />} >
            <Route exact path="" element={<ProtectedRoute permissions={'3'}><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            </Route>
            
        
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
         
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default Router;
