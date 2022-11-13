import React from 'react';
import '../CSS/searchWardRoster.css';
import WardDetails from '../components/wardDetails';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';
import Axios from "axios";

function SearchWardRoster() {

  const [rosterType,setRosterType]=useState(false);
  const [wardID,setWardID]=useState(1);
  const [wards,setWards]=useState([]);
  const [error,setError]=useState("");
  const [isError,setIsError]=useState(false);

  useEffect(()=>{
    fetchAvailableWards();
  },[])

  const fetchAvailableWards=async()=>{
    await Axios.get("http://localhost:5000/user/admin/getAvailableWards").then((res) => {
          setWards(res.data.availableWards);
        })
  }

  const handleSelectWard=(event)=>{
    const id=event.target.value
    if(id.length==0){
      setWardID(1);
      setIsError(false);
      setError("")
    }else{
      if(wards.includes(+id)){
        setWardID(id);
        setIsError(false);
        setError("")
      }else{
        setWardID(1);
        setIsError(true);
        setError("Enter a valid ward number")
      }
      
    }
    
    console.log(wardID);
  }


  return (
    <>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Ward Rosters</h1>
      <div className='wardSearch'> 
        <Button variant="primary" className='req-button-ward-search' style={{backgroundColor:"rgb(205, 37, 33)",height: "3rem",width:"13rem" }} onClick={()=>setRosterType(!rosterType)}>{rosterType===false? "show individual rosters" : "show ward rosters"}</Button> 
        <div className='alert-text'>
                
          <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
              <SingleBedIcon/></InputAdornment>}} id="filled-basic" label="Ward" variant="outlined" onChange={handleSelectWard}  />
          {isError && <Alert className='wardNumber-alert' severity="warning">{error}...</Alert>}
        </div>
        
      </div>
      <div className="available-wards">
        <p className='available-wards-label'><b>Available Wards : </b></p>
        <p className='available-ward-list'><b>{wards.join(" , ")}</b></p>
      </div>
      
      
      <WardDetails wardID={wardID}/>
    </>
  )
}

export default SearchWardRoster