import React from "react";
import "../CSS/about.css";
import homeimg from "../assets/home.jpg";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
const About = () => {
  return (
    <div className="about">
      <br></br>

      <div className="about-container">
        {/* <div className="login-container2"> */}
        <div className="right-side-about">
          <img src={homeimg} alt="" srcset="" />
        </div>

        <div className="left-side-about">
          <h1>About Us</h1>
          <div className="line-description">
            <p> TECHNEST </p>
            <p>SOFTWARE SOLUTION</p>
          </div>
          <div className="about-description">
            We are a team of computer science and Engineering undergraduates of University of Moratuwa.
            
          </div>
          <div className="button-container-about">
            <button>
              {" "}
              <Link to="/">Home page</Link>{" "}
            </button>
          </div>
        </div>
      </div>
      {/* group members */}
      <div className="group-container">
        <h1>Our Team</h1>

        <row class="member-container">
          <div class="member-col">
            <img src={require("../assets/gamunu.png")} alt=""></img>
            <div>
              <p></p>
              <h3>Gamunu Bandara</h3>
              <p>
                I am Gamunu Bandara from university of Moratuwa.
              </p>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 10, alignItems: "center", flex: "space-between" }}
              >
                <li>
                  <td>
                    <FacebookIcon></FacebookIcon>
                  </td>
                  <td>
                    <TwitterIcon></TwitterIcon>
                  </td>
                  <td>
                    <LinkedInIcon></LinkedInIcon>
                  </td>
                </li>
              </Box>
              <h6></h6>
            </div>
          </div>
          <div class="member-col">
            {/* <Link  to='../roster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}> */}

            <img src={require("../assets/sakuni.jpg")} alt=""></img>
            <div>
              <h3>Sakuni Bandara</h3>
              <p>
                I am Sakuni Bandara from university of Moratuwa.
              </p>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 10, alignItems: "center", flex: "space-between" }}
              >
                <li>
                  <td>
                    <FacebookIcon></FacebookIcon>
                  </td>
                  <td>
                    <TwitterIcon></TwitterIcon>
                  </td>
                  <td>
                    <LinkedInIcon></LinkedInIcon>
                  </td>
                </li>
              </Box>
              <h3></h3>
              <h6></h6>
            </div>
          </div>
          <div class="member-col">
            <img src={require("../assets/harshani.jpg")} alt=""></img>
            <div>
              <h3>Harshani Bandara</h3>
              <p>
              I am Harshani Bandara from university of Moratuwa.
              </p>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 10, alignItems: "center", flex: "space-between" }}
              >
                <li>
                  <td>
                    <FacebookIcon></FacebookIcon>
                  </td>
                  <td>
                    <TwitterIcon></TwitterIcon>
                  </td>
                  <td>
                    <LinkedInIcon></LinkedInIcon>
                  </td>
                </li>
              </Box>
              <h6></h6>
            </div>
          </div>
        </row>
      </div>
    </div>
  );
};

export default About;
