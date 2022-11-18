import React from 'react'
import welcomeimg from '../assets/doctor.png'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { border } from '@mui/system';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import authService from '../auth_service/auth_services';
import validator from "validator";
import Alert from "@mui/material/Alert";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Telegram, ThreeK } from '@mui/icons-material';


export default function AdminProfile() {
  const [admin1, setAdmin1] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [validateNewPasswordError, setValidateNewPasswordError] = useState();
  const [changed, setChanged] = useState(false);
  console.log(admin1);
  const getUserDetails = async (e) => {
    console.log(jwtDecode(localStorage.getItem("user")));
    // e.preventDefault();
    let user = null;
    user = jwtDecode(localStorage.getItem("user"));
    console.log(user.userName, user.userType);
    const data = { userName: user.userName, type: user.userType };

    await axios
      .post("http://localhost:5000/user/admin/userDetails", data,{headers: { "x-auth-token": authService.getUserToken() }})
      .then((res) => {
        console.log("AAAAAAAAAAAaaaaaaaaaaa");
        console.log(res.data.fullName);
        setAdmin1(res.data);
        setName(res.data.fullName);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setTelephone(res.data.telephone);
        setUserName(res.data.userName);
       
        return res.data;
      });
  };

  const handleChange = (e) => {
    // console.log("ddddddddd");
    var value = e.target.value;
    // console.log(e.target.name, e.target.value);
    if (e.target.name == "currentPassword") {
      setCurrentPassword(e.target.value);
      console.log("current password", value);
    } else if (e.target.name == "newPassword") {
      setNewPassword(e.target.value);
      setChanged(true);
      console.log("new password", value);
    }
  };
  const validataNewPassword22 = (e) => {
    let value = e.target.value;
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      console.log("correct password");
      setIsValidNewPassword(true);
      setValidateNewPasswordError("Strong Password");
    } else {
      console.log("incorrect password");
      setIsValidNewPassword(false);
      setValidateNewPasswordError("Not Strong Password");
    }
  };
  const handleSubmit = async (e) => {
    console.log("in the handle submit");
    e.preventDefault();
    if (isValidNewPassword) {
      const data = {currentPassword:currentPassword,newPassword:newPassword,email:email};
      await axios.post("http://localhost:5000/user/admin/changePassword", data, {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then((res)=>{
        console.log(res.data.msg,res.data.success)
        alert(res.data.msg)
        if(res.data.success){
          setCurrentPassword('')
          setNewPassword('')
        }
      })
    }
  };
  useState(() => {
    getUserDetails();
  });

  const admin = {name:"Harshani Bandara",
  position:'padiatric  surgeon',
  email:'harshanimadhushani51@gmail.com',
  contact_number:['0763919029','01245789632'], 
  address:"500/12, Thiyabharahena, Udugoda",
  wardNumbers:[1,2,3,4,5],
  speciality:[
    'Anesthesiology',
    'Dermatology',
   ],
   enteringDate:'2022/01/01'
};


  return (
    <section style={{ backgroundColor: '#40d2e5' ,marginTop:'-5px'}}>
      <div className='p-2 text-center' style={{marginBottom:'-35px'}} >
        <h1 className='mb-3' >Admin Profile</h1>
       
      </div>
      <MDBContainer className="py-5">
        

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={welcomeimg}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',borderWidth:'1px' }}
                  fluid />
                <p className="text-muted mb-1">{name}</p>
                <p className="text-muted mb-4" style={{color:'#fffff'}}>Admin</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <Link className="requestButton" to="../roster">
                      <MDBBtn outline className="ms-1">
                        Contact
                      </MDBBtn>
                    </Link> */}

                    <Link className="requestButton" to="../wardRoster">
                      <MDBBtn outline className="ms-1">
                        Ward Rosters
                      </MDBBtn>
                    </Link>
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Entering date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{admin.enteringDate}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{telephone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>User Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
               {/* password section */}
                <MDBRow>
                  <MDBCardText  style={{ color: '#11289c',fontWeight:'bold' }}>
                    Change Password
                  </MDBCardText>
                  <form onSubmit={handleSubmit}>
                    <MDBCol>
                      <MDBInput
                        name="currentPassword"
                        required
                        type="password"
                        label="current password"
                        onChange={handleChange}
                        value={currentPassword}
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        name="newPassword"
                        required
                        value={newPassword}
                        type="password"
                        label="new password"
                        onChange={(e) => {
                          handleChange(e);
                          validataNewPassword22(e);
                        }}
                      />
                      {!isValidNewPassword && changed && (
                        <Alert severity="warning">
                          {validateNewPasswordError}...
                        </Alert>
                      )}
                    </MDBCol>
                    <MDBRow>
                      <MDBBtn type="submit">Change Password</MDBBtn>
                    </MDBRow>
                  </form>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
