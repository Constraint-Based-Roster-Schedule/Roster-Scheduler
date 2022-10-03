import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import SignupForm from "./signupForm";
import DoctorDashboard from "./doctorDashboard";
import WardRoster from "./wardRoster";
import ShiftRequest from "./shiftRequest";
import Notifications from "./notifications";
import Login from "./login";
import RosterIndividual from "./roster";
import DocotrProfile from "./doctorProfile";
import HomePage from "./home";
import ConsultantDashboard from "./consultantDashboard";
import AdminDashboard from "./adminDashboard";
function router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signupForm" element={<SignupForm />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/wardRoster" element={<WardRoster />} />
        <Route path="/shiftRequest" element={<ShiftRequest />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/roster" element={<RosterIndividual />} />
        <Route path="about" element={<About />} />
        <Route path="signupForm" element={<SignupForm />} />
        <Route path="doctorDashboard" element={<DoctorDashboard />} />
        <Route path="roster" element={<RosterIndividual />} />
        <Route path="wardRoster" element={<WardRoster />} />
        <Route path="shiftRequest" element={<ShiftRequest />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="login" element={<Login />} />
        <Route path="doctorProfile" element={<DocotrProfile />} />
        <Route path="home" element={<HomePage />} />
        <Route path="doctorDashboard" element={<DoctorDashboard />} />
        <Route path="consultantDashboard" element={<ConsultantDashboard />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default router;
