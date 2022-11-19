import React, { useEffect,useState } from 'react';
import AddLeavesComponent from '../components/addLeavesComponent';
import AddPreferrableSlotsComp from '../components/addPreferrableSlotsComp';
import '../CSS/leaveRequest.css';
import Axios from "axios";
import authService from '../auth_service/auth_services';


function LeaveRequests() {

  const [shiftNames,setShiftNames]=useState([])

  useEffect(()=>{
    fetchShiftnames();
  },[])

  const fetchShiftnames=async()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month=monthNames[new Date().getMonth()].toLowerCase();
    const year=new Date().getFullYear();
    await Axios.get("http://localhost:5000/user/doctor/getShiftNames",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"month":month,"year":year,"wardID":authService.getWardID().toString()}
    }).then((res) => {

      setShiftNames(res.data.shiftNames)
    })
  }

  return (
    
    <section style={{marginTop:"6rem"}}>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"3rem"}}>Request leaves and preferrable working slots for next month</h1>
      <div className='leave-request-container'>
          <AddLeavesComponent shiftNames={shiftNames}/>
          <AddPreferrableSlotsComp shiftNames={shiftNames}/>
      </div>
    </section>
    
  )
}

export default LeaveRequests