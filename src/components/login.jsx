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
// import Footer from './footer.jsx'
function Login() {
  // const handlesubmit-(event)->{
  //     event.preventDefault();
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate=useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "type") {
      setType(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { emailAddress: email, type: type, password: password };

    await Axios.post("http://localhost:5000/auth/login", data).then((res) => {
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
            navigate("/doctorDashboard");
        //   window.location.herf = "../doctorDashboard";
        } 
        else if (decode.userType =="2") {
        } 
        else if (decode.userType == "3") {
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
            />
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={handleChange}
            />
            <label for="type">Type</label>
            <input
              type="text"
              placeholder="Enter type"
              id="type"
              name="type"
              value={type}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <div className="footer">
            <h4>
              Dont' have an account.. <link href="" />
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
