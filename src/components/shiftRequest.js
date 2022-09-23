import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../CSS/shiftRequest.css';
import Table from 'react-bootstrap/Table';
import doctor from '../public/doctor1.jpg'; 
import rosterObject from './rosterObject';

function ShiftRequest() {
  const id=2;
  const wardDoctors=[[1,'Thinira Wanasingha'],[2,'Sakuni Bandara'], [3,'Gamunu Bandara'], [4,'Harshani Bandara']];
  const myShifts={
    "1":[0,1],
    "2":[1],
    "3":[0,1],
    "4":[2],
    "5":[1],
    "6":[1,2],
    "7":[0,1],
    "8":[0,1],
    "9":[1],
    "10":[2],
    "11":[1,2],
    "12":[0,1],
    "13":[2],
    "14":[1],
    "15":[1,2]
  };
  const [date,setDate]=useState("");
  const [shift,setShift]=useState("");
  const [docID,setDocID]=useState("");
  const [showDoctorList,setShowDoctorList]=useState(false);
  const [showShiftList,setShowShiftList]=useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const shiftExchangeData={"date":date, "working slot":shift,"doctorID":docID}
    console.log(shiftExchangeData);
  }

  const handleReset=()=>{
    setDate("");
    setShift("");
    setDocID("");
  }

  function renderDoctorList(wardDoctors){
    const rows=[]
    for(var i=0;i<wardDoctors.length;i++){
      rows.push(<tr>
        <td>{wardDoctors[i][0]}</td>
        <td>{wardDoctors[i][1]}</td>
      </tr>);     
    }
    return rows;
  }

  function renderMyShifts(myShifts){
    const rows=[]
    for(var key in myShifts){
      rows.push(<tr>
        <td>{key}</td>
        <td>{myShifts[key].join(" , ")}</td>
      </tr>);     
    }
    return rows;
  }

  return (
    <>
      <h1 className='requestHeader'>Request for a Shift Exchange</h1>
      <div className='main-container col-lg-10'>
        <div className='form-container col-lg-8 '>
          <img src={doctor} alt="image" style={{width:"400px", marginRight:"8rem",float:"right"}}></img>
          <Form className='py-3 d-flex flex-column justify-content-center col-lg--4' onSubmit={handleSubmit}>
            <Form.Group className="mb-3 col-lg-12" controlId="Date">
              <Form.Label style={{color:"white"}}>Date:</Form.Label>
              <Form.Control type="text" placeholder="Enter the date" value={date} onChange={(e)=>setDate(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3 col-lg-12">
              <Form.Label htmlFor="workingSlot" style={{color:"white"}}>Working Slot:</Form.Label>
              <Form.Select id="workingSlot" value={shift} onChange={(e)=>setShift(e.target.value)} required>
                <option value={"default"}>Working Slot</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 col-lg--12" controlId="requestingDoctor">
              <Form.Label style={{color:"white"}}>Requesting Doctor:</Form.Label>
              <Form.Control type="text" placeholder="Doctor ID" value={docID} onChange={(e)=>setDocID(e.target.value)} required/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop:"1rem"}}>
              Submit
            </Button>
            <Button variant="primary" type="button" style={{marginTop:"1rem"}}>
              Reset
            </Button>
          </Form>
        </div>
        <div className='doctorList'>
            <Button variant='primary' onClick={()=>setShowDoctorList(!showDoctorList)} style={{marginTop:"6rem", backgroundColor:"rgb(25, 25, 168)" , width:"20rem"}}>Show Doctors of the Ward</Button>
            {showDoctorList && (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {renderDoctorList(wardDoctors)}
                </tbody>
              </Table>
            )}
            <Button variant='primary' onClick={()=>setShowShiftList(!showShiftList)} style={{marginTop:"4rem", backgroundColor:"rgb(25, 25, 168)" , width:"20rem"}}>Show Your Working Slots</Button>
            {showShiftList && (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {renderMyShifts(myShifts)}
                </tbody>
              </Table>
            )}
        </div>
      </div>    
    </>
  )
}

export default ShiftRequest
