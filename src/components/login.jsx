import React, { useState } from "react";
import "../CSS/login.css";
import logo from "../assets/logo.png";
import welcomeimg from "../assets/doctor.png";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import config from '../config.json';
// import Footer from './footer.jsx'
function Login() {
  // const handlesubmit-(event)->{
  //     event.preventDefault();
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate=useNavigate();
  const APIEndpoint=config.DOMAIN_NAME;
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value,name)
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "type") {
      setType(value);
    }
    
  };
  
  //handle the submit and  send to the following page according to the user type
  //if doctor-user type 1
  //admin user type 0
  //consultant user type 2
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { emailAddress: email, type: type, password: password };

    await Axios.post(APIEndpoint+"/auth/login", data).then((res) => {
      console.log(res.data.msg + "AAAAAAAAAAAa");

      if (!res.data.success) {
        console.log("insideError");
        alert(res.data.msg);
        // toast.error(res.data.msg,{position:toast.POSITION.TOP_RIGHT});
      } else {
        localStorage.setItem("user", res.data.token);
        let decode = jwtDecode(res.data.token);
        // console.log(decode);
        if (decode.userType == "1") {
            console.log(decode.userType);
            navigate("/doctor");
        //   window.location.herf = "../doctorDashboard";
        } 
        else if (decode.userType =="2") {
          console.log(decode.userType);
          navigate("/consultant");
          
        } 
        else if (decode.userType == "3") {
          console.log(decode.userType);
          navigate("/admin");
        }
      }
    });
  };
  return (
    <div className="main-login">
      <br></br>
      {/* <link >Register</link> */}
      <div className="login-container">
        <div className="left-side">
          <div className="img-class">
            <img src={logo} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email.."
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={handleChange}
              required
            />
            <label for="type">Type</label>
            <select name="type" id="type" value={type} onChange={handleChange} required>
            <option selected disabled hidden value="">
                      {" "}
                      Select{" "}
                    </option>{" "}
              <option name="1" id="type"value="1">Doctor</option>
              <option name="3" id="type"value="3">Admin</option>
              <option name="2" id="type" value="2">Consultant</option>
              
            </select>
            {/* <input
              type="text"
              placeholder="Enter type"
              id="type"
              name="type"
              value={type}
              onChange={handleChange}
            /> */}
            <button type="submit">Submit</button>
          </form>
          <div className="footer">
            <h4>
              {/* Dont' have an account.. <link href="" /> */}
            </h4>
          </div>
        </div>

        <div className="right-side">
          <div className="welcome-note">
            <h3>........Welcome Back........</h3>
          </div>
          <div className="welcome-img">
            <img src={welcomeimg} id="wel-img-id" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
