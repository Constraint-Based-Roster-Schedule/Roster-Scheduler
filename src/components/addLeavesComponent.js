import React from 'react';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import { InputLabel } from '@mui/material';
import '../CSS/leaveRequest.css';
import { IconButton } from '@mui/material';
import {AiOutlineDelete} from 'react-icons/ai';
import {IoMdAddCircle} from 'react-icons/io';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from '@mui/material/Alert';
import Axios from "axios";


function AddLeavesComponent() {
  const [leaveRequests,setLeaveRequests]=useState([]);

  const [leavedate,setDate]=useState('');
  const [slot,setSlot]=useState(null);
  const [isError,setIsError]=useState(false);
  const [error,setError]=useState('');
  const [isDateValidate,setIsDateValidate]=useState(true);
  const [Dateerror,setDateError]=useState('');

  const numberOfDays=31

  function deleteLeaves(dltDate,dltSlot){
    
    var filteredNumbers = leaveRequests.filter(function (currentElement) {
      return currentElement.date ===dltDate  && currentElement.slot===dltSlot;
    });
    var temp=leaveRequests;
    var filtered = temp.filter(
    function(e) {
      return this.indexOf(e) < 0;
    },filteredNumbers
    );
    setLeaveRequests(filtered);
  }

  function addInputs(){
    if(slot===null || leavedate.length===0){
      setIsError(true);
      setError("You have to fill both fields")
    }else{
      setIsError(false);
      setError('');
      setLeaveRequests([...leaveRequests,{"date":leavedate,"slot":slot}])
      setDate('');
      setSlot(null);
      //console.log(leaveRequests);
    }
    
  }

  const handleSubmit=async()=>{
    await Axios.post("http://localhost:5000/user/doctor/submitLeaveRequest", leaveRequests).then((res) => {
      console.log(res.data)})
    handleReset();
  }

  function handleReset(){
    setDate('');
    setSlot('');
    setLeaveRequests([]);
    setIsError(false);
    setError(false);
    setDateError('');
    setIsDateValidate(true)
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

  return (
    <div className='leaveRequestForm col-lg-5'>
      <div className='add-button-container'>
        <h1 className='add-text'>Add leave requests</h1>
      </div>
      <div className='input-row' >
        <TextField className='text-field' label="Date" variant="outlined" value={leavedate} onChange={(e)=>{setDate(e.target.value);validateDate(e)}} />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Slot</InputLabel>
          <Select className='slot-select' label="slot" name="os" value={slot} onChange={(e)=>setSlot(e.target.value)} >
              <MenuItem value="">
              <em>select the working slot</em>
              </MenuItem>
              <MenuItem key="1" value="1">1</MenuItem>
              <MenuItem key="2" value="2">2</MenuItem>
              <MenuItem key="3" value="3">3</MenuItem>
          </Select>
        </FormControl>
        <ButtonGroup>
          <IconButton className='add-btn' size='large' onClick={addInputs}  >
            <IoMdAddCircle className='add-icon'/>
          </IconButton>
        </ButtonGroup>
      </div>
      {isError && <Alert severity="warning"  style={{marginTop:"1rem", marginBottom:"1rem"}} >{error}...</Alert>}
      {!isDateValidate && <Alert severity="warning"  style={{marginTop:"1rem", marginBottom:"1rem"}} >{Dateerror}...</Alert>}
      <Table className='table-leave'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req)=>{
            return (<tr>
              <td>{req.date}</td>
              <td>{req.slot}</td>
              <td >
                <AiOutlineDelete className='delete-btn' onClick={()=>deleteLeaves(req.date,req.slot)}  >
                  <IoMdAddCircle className='delete-icon' />
                </AiOutlineDelete>
              </td>
            </tr>)
          })}
        </tbody>
      </Table>
      <div className='submit-leaves-div'>
        <Button className='submit-leaves-btn'  variant="contained" onClick={handleSubmit}>Submit</Button>  
        <Button className='submit-leaves-btn'  variant="contained" onClick={handleReset}>Reset</Button>
      </div> 
        
    </div>
  )
}

export default AddLeavesComponent