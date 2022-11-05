import React, { useState, useEffect } from "react";
import welcomeimg from "../assets/doctor.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { border } from "@mui/system";
import jwtDecode from "jwt-decode";

export default function DocotrProfile() {
  const [doctor1, setDoctor1] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [wardName, setWardName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [userName, setUserName] = useState("");

  console.log(doctor1);
  // useEffect
  const doctor = {
    name: "Harshani Bandara",
    position: "padiatric  surgeon",
    email: "harshanimadhushani51@gmail.com",
    contact_number: ["0763919029", "01245789632"],
    address: "500/12, Thiyabharahena, Udugoda",
    wardNumbers: [1, 2, 3, 4, 5],
    speciality: ["Anesthesiology", "Dermatology"],
    enteringDate: "2022/01/01",
  };

  // const doctor1=getUserDetails();

  const getUserDetails = async (e) => {
    console.log(jwtDecode(localStorage.getItem("user")));
    // e.preventDefault();
    let user = null;
    user = jwtDecode(localStorage.getItem("user"));
    console.log(user.userName, user.userType);
    const data = { userName: user.userName, type: user.userType };

    await axios
      .post("http://localhost:5000/user/doctor/userDetails", data)
      .then((res) => {
        console.log("AAAAAAAAAAAaaaaaaaaaaa");
        console.log(res.data.fullName);
        setDoctor1(res.data);
        setName(res.data.fullName);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setTelephone(res.data.telephone);
        setWardNumber(res.data.wardId);
        setWardName(res.data.wardName);
        setUserName(res.data.userName);
        return res.data;
      });
  };

  useState(() => {
    getUserDetails();
  });
  return (
    <section style={{ backgroundColor: "#40d2e5", marginTop: "-5px" }}>
      <div className='p-2 text-center' style={{marginBottom:'-35px'}} >
        <h1 className='mb-3' >Doctor Profile</h1>
       
      </div>
      <MDBContainer>
        <h1>profile</h1>
      </MDBContainer>
      <MDBContainer className="py-4">
        {/* <button onClick={getUserDetails}></button> */}

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={welcomeimg}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px", borderWidth: "1px" }}
                  fluid
                />
                <p className="text-muted mb-1">{name}</p>
                <p className="text-muted mb-4" style={{ color: "#fffff" }}>
                  {doctor.position}
                </p>
                <div className="d-flex justify-content-center mb-2">

                  <Link className="requestButton" to="../roster">
                    <MDBBtn outline className="ms-1">
                      My Roster
                    </MDBBtn>
                  </Link>

                  <Link className="requestButton" to="../wardRoster">
                    <MDBBtn outline className="ms-1">
                      Ward Roster
                    </MDBBtn>
                  </Link>

                </div>
              </MDBCardBody>
            </MDBCard>

            {/* <MDBCard className="mb-4 ">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Specialist area
                    </MDBCardText>
                  </MDBListGroupItem>

                  {doctor.speciality.map((reptile) => (
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>{reptile}</MDBCardText>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard> */}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Full Name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Email
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      User Name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Entering date
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {doctor.enteringDate}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Phone
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {telephone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Ward Name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{wardName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Address
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Ward number
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {wardNumber}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
