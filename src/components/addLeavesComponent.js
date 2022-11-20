
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
import React,{ useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from '@mui/material/Alert';
import Axios from "axios";
import authService from "../auth_service/auth_services";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import config from '../config.json';

function AddLeavesComponent(props) {
  const [leaveRequests,setLeaveRequests]=useState([]);

  const [leavedate,setDate]=useState('');
  const [slot,setSlot]=useState(null);
  const [isError,setIsError]=useState(false);
  const [error,setError]=useState('');
  const [isDateValidate,setIsDateValidate]=useState(true);
  const [Dateerror,setDateError]=useState('');

  const numberOfDays=31
  const [open, setOpen] = React.useState(false);
  const APIEndpoint=config.DOMAIN_NAME+"/user";

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

  function deleteLeaves(dltDate,dltSlot){

    var filteredNumbers = leaveRequests.filter(function (currentElement) {
      return currentElement[0] ===dltDate  && currentElement[1]===dltSlot;
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

      setLeaveRequests([...leaveRequests,[+leavedate,+slot]])

      setDate('');
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

    await Axios.get(APIEndpoint+"/doctor/submitLeaveRequest", {
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"leaveRequests":leaveRequests,"month":month,"year":year,"docID":doc_id,"wardID":wardID}
    }).then((res) => {
      console.log(res.data)})
      handleReset();
      handleClick();
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
      </Snackbar>
      <div className='add-button-container'>
        <h1 className='add-text'>Add leave requests</h1>
      </div>
      <div className='input-row' >
        <TextField className='text-field' label="Date" variant="outlined" value={leavedate} onChange={(e)=>{setDate(e.target.value);validateDate(e)}} />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Slot</InputLabel>
          <Select className='slot-select' label="slot" name="os" value={slot} onChange={(e)=>setSlot(e.target.value)} >


              {props.shiftNames.map((shift,index)=>{
                return <MenuItem key={index} value={index}>{shift[0]}</MenuItem>
              })}
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
              <td>{req[0]}</td>
              <td>{req[1]}</td>
              <td >
                <AiOutlineDelete className='delete-btn' onClick={()=>deleteLeaves(req[0],req[1])}  >
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