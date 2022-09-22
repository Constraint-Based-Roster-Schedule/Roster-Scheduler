import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../CSS/shiftRequest.css';
import Table from 'react-bootstrap/Table';
import doctor from '../public/doctor1.jpg'; 
import rosterObject from './rosterObject';

function ShiftRequest() {
  const id=2;
  const [showDoctorList,setShowDoctorList]=useState(false);
  const [showShiftList,setShowShiftList]=useState(false);

  return (
    <>
      <h2 className='requestHeader'>Request for a shift exchange</h2>
      <div className='main-container col-lg-10'>
        <div className='form-container col-lg-8 '>
          <img src={doctor} alt="image" style={{width:"350px", marginRight:"8rem",float:"right"}}></img>
          <Form className='py-3 d-flex flex-column justify-content-center col-lg--4'>
            <Form.Group className="mb-3 col-lg-12" controlId="Date">
              <Form.Label style={{color:"white"}}>Date:</Form.Label>
              <Form.Control type="text" placeholder="Enter the date" />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-12">
              <Form.Label htmlFor="workingSlot" style={{color:"white"}}>Working Slot:</Form.Label>
              <Form.Select id="workingSlot">
                <option value={"default"}>Choose working slot</option>
                <option value={"1"}>Morning shift</option>
                <option value={"2"}>Evening shift</option>
                <option value={"3"}>Night shift</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 col-lg--12" controlId="requestingDoctor">
              <Form.Label style={{color:"white"}}>Requesting Doctor:</Form.Label>
              <Form.Control type="text" placeholder="Doctor ID" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className='doctorList'>
            <Button variant='primary' onClick={()=>setShowDoctorList(!showDoctorList)} style={{marginTop:"4rem", backgroundColor:"rgb(150, 25, 29)" , width:"20rem"}}>Show Doctors of the Ward</Button>
            {showDoctorList && (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td >Larry the Bird</td>                    
                  </tr>
                </tbody>
              </Table>
            )}
            <Button variant='primary' onClick={()=>setShowShiftList(!showShiftList)} style={{marginTop:"4rem", backgroundColor:"rgb(150, 25, 29)" , width:"20rem"}}>Show Your Working Slots</Button>
            {showShiftList && (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Shift</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Morning</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Evening</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td >Night</td>                    
                  </tr>
                </tbody>
              </Table>
            )}
        </div>
      </div>    
    </>
  )
}

export default ShiftRequest
