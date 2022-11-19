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
import authService from "../auth_service/auth_services";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddPreferrableSlotsComp(props) {
  const [preferrableSlotRequests,setpreferrableSlotRequests]=useState([]);
  const [slotdate,setSlotDate]=useState('');
  const [slot,setSlot]=useState(null);
  const [isError,setIsError]=useState(false);
  const [error,setError]=useState('');
  const [isDateValidate,setIsDateValidate]=useState(true);
  const [Dateerror,setDateError]=useState('');
  

  const numberOfDays=31
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
  };


  function deleteSlots(sltDate,sltSlot){   
    var filteredNumbers = preferrableSlotRequests.filter(function (currentElement) {
      return currentElement[0] ===sltDate  && currentElement[1]===sltSlot;
    });
    var temp=preferrableSlotRequests;
    var filtered = temp.filter(
    function(e) {
      return this.indexOf(e) < 0;
    },filteredNumbers
    );
    setpreferrableSlotRequests(filtered);
  }

  function addInputs(){
    if(slot===null || slotdate.length===0){
      setIsError(true);
      setError("You have to fill both fields")
    }else{
      setIsError(false);
      setError('');
      setpreferrableSlotRequests([...preferrableSlotRequests,[+slotdate,+slot]])
      setSlotDate('');
      setSlot(null);

    }
    
  }

  const handleSubmit=async()=>{
    const monthNames = ["january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    const month=monthNames[new Date().getMonth()+1].toLowerCase();
    let year=''
    if(month==="january"){
      const current_year=new Date().getFullYear();
      year=(+current_year+1).toString();
    }else{
      year=new Date().getFullYear();
    }
    const doc_id=authService.getUserID().toString();
    const wardID=authService.getWardID().toString();
    //console.log(month)
    await Axios.get("http://localhost:5000/user/doctor/submitPrefferableSlots", {
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"prefferableSlots":preferrableSlotRequests,"month":month,"year":year,"docID":doc_id,"wardID":wardID}
    }).then((res) => {
      console.log(res.data)})
      handleReset();
      handleClick();
  }

  function handleReset(){
    setSlotDate('');
    setSlot('');
    setpreferrableSlotRequests([]);
    setIsError(false);
    setError(false);
    setDateError('');
    setIsDateValidate(true);
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
    <div className='preferrableSlotForm col-lg-5'>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
      </Snackbar>
      <div className='add-button-container'>
        <h1 className='add-text'>Add preferrable working slots</h1>
      </div>
      <div className='input-row'>
        <TextField className='text-field' label="Date" variant="outlined" value={slotdate} onChange={(e)=>{setSlotDate(e.target.value);validateDate(e)}} />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Slot</InputLabel>
          <Select className='slot-select' label="slot" name="os" value={slot} onChange={(e)=>setSlot(e.target.value)} >


              {props.shiftNames.map((shift,index)=>{
                return <MenuItem key={index} value={index}>{shift[0]}</MenuItem>
              })}
          </Select>
        </FormControl>
        <ButtonGroup>
          <IconButton className='add-btn' size='large' onClick={addInputs} >
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
          {preferrableSlotRequests.map((req)=>{
            return (<tr>
              <td>{req[0]}</td>
              <td>{req[1]}</td>
              <td >
                <AiOutlineDelete className='delete-btn' onClick={()=>deleteSlots(req[0],req[1])}  >
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

export default AddPreferrableSlotsComp