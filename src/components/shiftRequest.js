import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../CSS/shiftRequest.css';
import Table from 'react-bootstrap/Table';
import doctor from '../public/doctor1.jpg'; 
import FormGroup from '@mui/material/FormGroup';
import { useEffect } from 'react';
import Axios from "axios";
import Alert from '@mui/material/Alert';

function ShiftRequest() {
  const id=2;
  const [date,setDate]=useState("");
  const [shift,setShift]=useState("");
  const [datewith,setDatewith]=useState("");
  const [shiftwith,setShiftwith]=useState("");
  const [docID,setDocID]=useState("");
  const [showDoctorList,setShowDoctorList]=useState(false);
  const [showShiftList,setShowShiftList]=useState(false);
  const [wardDoctors,setWardDoctors]=useState([])
  const [myShifts,setMyshifts]=useState({});

  const [isDateValidate,setIsDateValidate]=useState(true);
  const [Dateerror,setDateError]=useState('');
  const [isDateWithValidate,setIsDateWithValidate]=useState(true);
  const [DateWitherror,setDateWithError]=useState('');

  const numberOfDays=31

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData=async()=>{
    await Axios.get("http://localhost:5000/user/doctor/getData").then((res) => {
      setWardDoctors(res.data.wardDoctors);
      setMyshifts(res.data.myShifts);
      console.log(res.data.wardDoctors);
      console.log(res.data.myShifts);
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const shiftExchangeData={"currentDate":date, "currentShift":shift,"requestedDate":datewith,"requestedShift":shiftwith,"toID":"633be3ad645fd11f4252f925","requestState":1}
    await Axios.post("http://localhost:5000/user/doctor/putRequest", shiftExchangeData).then((res) => {
      console.log(res.data)})
    //console.log(shiftExchangeData);
    handleReset();
  }

  const handleReset=()=>{
    setDate("");
    setShift("");
    setDatewith("");
    setShiftwith("");
    setDocID("");
  }

    const validateDateWith=(e)=>{
    var enter_date=e.target.value;
    if(isNaN(enter_date)){
        setIsDateWithValidate(false);
        setDateWithError(`Date should be a numeric value from 1 to ${numberOfDays}`);
    }else if((enter_date>numberOfDays || enter_date<=0) && enter_date.length>0 ){
        setIsDateWithValidate(false);
        setDateWithError(`Date should be a numeric value from 1 to ${numberOfDays}`);
    }else{
        setIsDateWithValidate(true);
    }
  }

   const validateDate=(e)=>{
    var enter_date=e.target.value;
    if(isNaN(enter_date)){
        setIsDateValidate(false);
        setDateError(`Date should be a numeric value from 1 to ${numberOfDays}`);
    }else if((enter_date>numberOfDays || enter_date<=0) && enter_date.length>0 ){
        setIsDateValidate(false);
        setDateError(`Date should be a numeric value from 1 to ${numberOfDays}`);
    }else{
        setIsDateValidate(true);
    }
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
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"3rem"}}>Request for a Shift Exchange</h1>
      <div className='main-container col-lg-10'>
        <div className='form-container col-lg-2 '>          
          <img className='shiftRequestPhoto col-lg-5' src={doctor} alt="image" ></img>
          <Form className= 'request-form d-flex col-lg-7 ' onSubmit={handleSubmit}>            
            <Form.Group className="formGrp col-lg-8" controlId="Date">  
              <Form.Label className='formLabel' >Slot to exchange:</Form.Label> 
              <Form.Group className='inner-formGrp'>
                <Form.Control className='formControlDate' type="text" placeholder="Date" value={date} onChange={(e)=>{setDate(e.target.value);validateDate(e);}}  required/>
                <Form.Select className='formSelect' id="workingSlot" value={shift} onChange={(e)=>setShift(e.target.value)} required>
                  <option value={"default"}>Slot</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
              </Form.Select>
              </Form.Group>                    
            </Form.Group>
            
            <Form.Group className="formGrp  col-lg-8 " controlId="Date">   
              <Form.Label className='formLabel'>Slot to exchange with:</Form.Label>    
              <Form.Group className='inner-formGrp'>
                <Form.Control className='formControlDate' type="text" placeholder="Date" value={datewith} onChange={(e)=>{setDatewith(e.target.value);validateDateWith(e);}}  required/>
                <Form.Select className='formSelect' id="workingSlot" value={shiftwith} onChange={(e)=>setShiftwith(e.target.value)} required>
                  <option value={"default"}>Slot</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
              </Form.Group>
              
            </Form.Group>       
              
            
            <Form.Group className="formGrp  col-lg-8" controlId="requestingDoctor">
              <Form.Label className='formLabel'>Requesting Doctor:</Form.Label>
              <Form.Control className='formControlId' type="text" placeholder="Doctor ID" value={docID} onChange={(e)=>setDocID(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="formGrp-btn mb-3 col-lg-8 d-flex flex-row justify-content-center px-0">
              <Button className='req-sub-btn' variant="primary" type="submit" >
                Submit
              </Button>
              <Button className='req-reset-btn' variant="primary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </Form.Group>
          {!isDateValidate && <Alert severity="warning">{Dateerror}...</Alert>}
          {!isDateWithValidate && <Alert severity="warning" >{DateWitherror}...</Alert>}    
          </Form>
          
        </div>
        <div className='doctorList'>
            <Button className='show-doctor-list-btn' variant='primary' onClick={()=>setShowDoctorList(!showDoctorList)} >Show Doctors of the Ward</Button>
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
            <Button className='show-shifts-btn' variant='primary' onClick={()=>setShowShiftList(!showShiftList)}>Show Your Working Slots</Button>
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
