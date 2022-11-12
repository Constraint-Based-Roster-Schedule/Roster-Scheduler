import { useEffect, useState } from 'react';
import WardRosterComponent from './wardRosterComponent';
import '../CSS/searchWardRoster.css'
import Box from '@mui/material/Box';
import Axios from "axios";
import * as React from 'react';


function WardDetails(props) {

  const [wardName,setwardName]=useState('');
  const [docDetails,setDocDetails]=useState([]);
  const [consultantDetails,setConsultantDetails]=useState([]);

  useEffect(()=>{
    fetchWardDetails();
  },[])

  const fetchWardDetails=async()=>{
    const ward=props.wardID;
    //console.log(ward)
    await Axios.get("http://localhost:5000/user/admin/getWardDetails",{
            params:{"wardID":ward}
        }).then((res) => {
          //console.log(res.data);
          setwardName(res.data.wardName);
          setDocDetails(res.data.docData);
          setConsultantDetails(res.data.consultantData);
        })
  }

  

  return (
    <Box className='ward-detail-container'>
        <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem",fontSize:"2em", color:"white"}}>Ward number {props.wardID}</h1>
        <div className='data-card'>
          <div className='ward-det'>
            <p className='ward-detail-p'>ward name     :  {wardName}</p>
            <p className='ward-detail-p'>Consultant details</p>
            <p className='const-detail-p'>Consultant name   :  {consultantDetails[0]} {consultantDetails[1]} </p>
            <p className='const-detail-p'>Consultant email   :  {consultantDetails[2]} </p>
            <p className='const-detail-p'>Consultant contact number  :  {consultantDetails[3]} </p>
          </div>
          <div className='doc-det'>
            <h1 className='doc-topic'>Ward doctors</h1>
            {docDetails.map((doc,index)=>{
              return (
                <div className='doc-container'>
                  <p className='doc-detail'>Name : {doc[0]} {doc[1]}</p>
                  <p className='doc-sub-detail'>Email : {doc[2]}</p>
                  <p className='doc-sub-detail'>Contact number : {doc[3]}</p>
                </div>
              )
            })}
            
          </div>
        </div>
        <WardRosterComponent/>
    </Box>
  )
}

export default WardDetails