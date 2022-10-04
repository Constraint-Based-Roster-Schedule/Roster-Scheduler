import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../auth_service/auth_services";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
   

    authService.logOut();
    
    navigate("/login");
  }, []);
}

export default Logout;
