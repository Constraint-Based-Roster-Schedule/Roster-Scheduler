import React from 'react';
import AddLeavesComponent from '../components/addLeavesComponent';
import AddPreferrableSlotsComp from '../components/addPreferrableSlotsComp';
import '../CSS/leaveRequest.css';

function LeaveRequests() {
  return (
    <>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"3rem"}}>Request leaves and preferrable working slots for next month</h1>
      <div className='leave-request-container'>
          <AddLeavesComponent/>
          <AddPreferrableSlotsComp/>
      </div>
    </>
    
  )
}

export default LeaveRequests