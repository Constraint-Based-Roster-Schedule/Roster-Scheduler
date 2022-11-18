import React from 'react';
import '../CSS/searchWardRoster.css'
import Box from '@mui/material/Box';
import Axios from "axios";
import { useEffect, useState } from 'react';
import IndividualRoster from './individualRoster';
import { ConstructionOutlined } from '@mui/icons-material';

function Doc_details(props) {

  const [doctorDetails,setDoctorDetails]=useState([]);
  const [docId,setDocID]=useState()

  useEffect(()=>{
    //setDocID(props.docID)
    fetchDoctorDetails();

  },[props.docID])

  const fetchDoctorDetails=async(id)=>{
    const doc_id=props.docID
    await Axios.get("http://localhost:5000/user/admin/getDoctorDetails",{
      params:{"docID":+doc_id}
    }).then((res) => {
          setDoctorDetails(res.data.doctorDetails);
          //console.log(props.docID);
          setDocID(res.data.docID)
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
      <IndividualRoster docID={docId} wardID={doctorDetails[5]}/>
    </div>
  )
}

export default Doc_details