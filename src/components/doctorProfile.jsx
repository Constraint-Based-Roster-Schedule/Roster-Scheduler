import React from 'react'
import welcomeimg from '../assets/doctor.png'

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
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { border } from '@mui/system';

export default function DocotrProfile() {
 
  const doctor = {name:"Harshani Bandara",
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
    <section style={{ backgroundColor: '#40d2e5' ,marginTop:'-30px'}}>

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
                <p className="text-muted mb-1">{doctor.name}</p>
                <p className="text-muted mb-4" style={{color:'#fffff'}}>{doctor.position}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button style={{color:'#1c0b7c',background:'#4ceded'}}>View Roster</button>
                  <button outline className="ms-1" >Contact</button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 ">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
      
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Specialist area</MDBCardText>
                  </MDBListGroupItem>
                  
                  
                  {(doctor.speciality).map((reptile) => 
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                   
                    
                    <MDBCardText>{reptile}</MDBCardText>
                  </MDBListGroupItem>)}
                 
                </MDBListGroup>
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
                    <MDBCardText className="text-muted">{doctor.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Entering date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor.enteringDate}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{(doctor.contact_number).map((reptile) => <li>{reptile}</li>)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Land number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{(doctor.contact_number).map((reptile) => <li>{reptile}</li>)}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: '#11289c',fontWeight:'bold' }}>Ward numbers</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{(doctor.wardNumbers).map((reptile) => <li>{reptile}</li>)}</MDBCardText>
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
