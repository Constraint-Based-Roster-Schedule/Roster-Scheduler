import React from 'react';
import '../CSS/searchWardRoster.css'
import Box from '@mui/material/Box';
import Axios from "axios";
import { useEffect, useState } from 'react';
import IndividualRoster from './individualRoster';

function Doc_details(props) {

  const [doctorDetails,setDoctorDetails]=useState([])

  useEffect(()=>{
    fetchDoctorDetails();
  },[])

  const fetchDoctorDetails=async()=>{
    await Axios.get("http://localhost:5000/user/admin/getDoctorDetails",{
      params:{"docID":props.docID}
    }).then((res) => {
          setDoctorDetails(res.data.doctorDetails);
        })
  }

  return (
    <div className='doctor-detail-container'>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem",fontSize:"2em", color:"white"}}>Roster for {doctorDetails[0]} {doctorDetails[1]}</h1>
      <div className='individual-doc-details'>
        <p className='indivilual-doc-d'>Name : {doctorDetails[0]} {doctorDetails[1]}</p>
        <p className='indivilual-doc-d'>Email : {doctorDetails[3]}</p>
        <p className='indivilual-doc-d'>Address : {doctorDetails[2]}</p>
        <p className='indivilual-doc-d'>Contact Number : {doctorDetails[4]}</p>

      </div>
      <IndividualRoster/>
    </div>
  )
}

export default Doc_details