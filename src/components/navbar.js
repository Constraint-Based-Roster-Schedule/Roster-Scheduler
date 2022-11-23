import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";
import logo from "../public/Group 3.png";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import authService from "../auth_service/auth_services";
import { GrLogout } from "react-icons/gr";
import { Navigate } from "react-router-dom";
import {MdLogin} from "react-icons/md"

import { Button } from 'react-bootstrap';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const type = authService.getUserType();
  const navigate = useNavigate();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  const linkstyle = {
    marginLeft: "100px",
    fontSize: "16px",
    textDecoration: "none",
    letterSpacing: "2px",
  };

  return (
    <div className="navBarMainContainer">
      <nav >
        <div className="nav-center">
          <div className="nav-header">
            {type==null && (<Link to=''>
              <img src={logo} className="logo" alt="logo" />
            </Link>)}
            {type == "1" && (
              <Link to="/doctor" style={linkstyle}>
                <img src={logo} className="logo" alt="logo" />
              </Link>
            )}
            {type == "2" && (
              <Link to="/consultant" style={linkstyle}>
                <img src={logo} className="logo" alt="logo" />
              </Link>
            )}
            {type == "3" && (
              <Link to="/admin" style={linkstyle}>
                <img src={logo} className="logo" alt="logo" />
              </Link>
            )}
            <button className="nav-toggle" onClick={toggleLinks}>
              <FaBars />
            </button>
          </div>
          <div
            className="links-container"
            ref={linksContainerRef}
            style={{ marginLeft: "20px" }}
          >
            <ul className="links" ref={linksRef}>
              {type == null && (
                <Link className="navLink" to="/" style={linkstyle}>
                  <span>
                    Home
                    <HiHome
                      size={30}
                      style={{ marginLeft: "15px", marginTop: "-4px" }}
                    />
                  </span>
                </Link>
              )}
              {type == null && (
                <Link className="navLink" to="/login" style={linkstyle}>
                  <span>
                    Login
                    <MdLogin
                      size={30}
                      style={{ marginLeft: "15px", marginTop: "-4px" }}
                    />
                  </span>
                </Link>
              )}
              {type == null && (
                <Link to="/about" style={linkstyle}>
                  <span>
                    About
                    <HiInformationCircle
                      size={30}
                      style={{ marginLeft: "15px", marginTop: "-4px" }}
                    />
                  </span>
                </Link>
              )}
              {/* {type == null && <Link to='/profile' style={linkstyle}><span>Profile<BsFillPersonFill size={30} style={{marginLeft:'15px',marginTop:"-8px"}}/></span></Link>} */}

              {type != null && (
                <Link to ={'/logout' }>
                  <span>
                    <GrLogout
                      size={25}
                      style={{ marginLeft: "15px", marginTop: "2px" }}
                    />
                  </span>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
