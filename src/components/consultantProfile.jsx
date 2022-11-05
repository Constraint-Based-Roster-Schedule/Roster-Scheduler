import React from "react";
import welcomeimg from "../assets/doctor.png";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
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

export const ConsultantProfile = () => {
  const [consultant1, setConsultant1] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [wardName, setWardName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [userName, setUserName] = useState("");
  const [speciality, setSpeciality] = useState("");
  console.log(consultant1);
  const getUserDetails = async (e) => {
    console.log(jwtDecode(localStorage.getItem("user")));
    // e.preventDefault();
    let user = null;
    user = jwtDecode(localStorage.getItem("user"));
    console.log(user.userName, user.userType);
    const data = { userName: user.userName, type: user.userType };

    await axios
      .post("http://localhost:5000/user/consultant/userDetails", data)
      .then((res) => {
        console.log("AAAAAAAAAAAaaaaaaaaaaa");
        console.log(res.data.fullName);
        setConsultant1(res.data);
        setName(res.data.fullName);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setTelephone(res.data.telephone);
        setWardNumber(res.data.wardId);
        setWardName(res.data.wardName);
        setUserName(res.data.userName);
        setSpeciality(res.data.speciality);
        return res.data;
      });
  };

  useState(() => {
    getUserDetails();
  });

  const consultant = {
    name: "Sakuni Bandara",
    position: "padiatric  surgeon",
    email: "harshanimadhushani51@gmail.com",
    contact_number: ["0763919029", "01245789632"],
    address: "500/12, Thiyabharahena, Udugoda",
    wardNumbers: [1, 2, 3, 4, 5],
    speciality: ["Anesthesiology", "Dermatology"],
    enteringDate: "2022/01/01",
  };

  return (
    <section style={{ backgroundColor: "#40d2e5", marginTop: "-5px" }}>
      <div className='p-2 text-center' style={{marginBottom:'-35px'}} >
        <h1 className='mb-3' >Consultant Profile</h1>
       
      </div>
      <MDBContainer className="py-5" style={{ backgroundColor: "#40d2e5", marginTop: "-5px" }} >
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
                  {speciality}
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

            <MDBCard className="mb-4 ">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Specialist area
                    </MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>{speciality}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
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
                    {/* <MDBCardText className="text-muted">{(consultant.wardNumbers).map((reptile) => <li>{reptile}</li>)}</MDBCardText> */}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{ color: "#11289c", fontWeight: "bold" }}
                    >
                      Ward name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{wardName}</MDBCardText>
                    {/* <MDBCardText className="text-muted">{(consultant.wardNumbers).map((reptile) => <li>{reptile}</li>)}</MDBCardText> */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default ConsultantProfile;
