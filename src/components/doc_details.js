import React from 'react';
import '../CSS/searchWardRoster.css'
import Box from '@mui/material/Box';
import Axios from "axios";
import { useEffect, useState } from 'react';
import IndividualRoster from './individualRoster';
import { ConstructionOutlined } from '@mui/icons-material';

function Doc_details(props) {


  return (
    <div className='doctor-detail-container'>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem",fontSize:"2em", color:"white"}}>Roster for {props.doctorDetails[0]} {props.doctorDetails[1]}</h1>
      <div className='individual-doc-details'>
        <p className='indivilual-doc-d'>Name : {props.doctorDetails[0]} {props.doctorDetails[1]}</p>
        <p className='indivilual-doc-d'>Email : {props.doctorDetails[3]}</p>
        <p className='indivilual-doc-d'>Address : {props.doctorDetails[2]}</p>
        <p className='indivilual-doc-d'>Contact Number : {props.doctorDetails[4]}</p>

      </div>
      <IndividualRoster docID={props.docID}/>
    </div>
  )
}

export default Doc_details