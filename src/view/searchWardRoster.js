import React from 'react';
import '../CSS/searchWardRoster.css';
import WardDetails from '../components/wardDetails';
import Doc_details from '../components/doc_details';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';
import Axios from "axios";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function SearchWardRoster() {

  const [rosterType,setRosterType]=useState(false);
  const [wardID,setWardID]=useState(1);
  const [wards,setWards]=useState([]);
  const [allDoctors,setAllDoctors]=useState([])
  const [wardObj,setWardObj]=useState("");
  const [wardOpen,setWardOpen] = useState(false);
  const ITEM_HEIGHT = 120;
  const [docID, setDocID] = React.useState(1);
  const [open,setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false)
  const [WardAnchorEl, setWardAnchorEl] = useState(false)


  useEffect(()=>{
    fetchAvailableWards();
    fetchAllDoctors();
  },[])

  const fetchAvailableWards=async()=>{
    await Axios.get("http://localhost:5000/user/admin/getAvailableWards").then((res) => {
          setWards(res.data.availableWards);
        })
  }

  const fetchAllDoctors=async()=>{
    await Axios.get("http://localhost:5000/user/admin/getAllDoctors").then((res) => {
          setAllDoctors(res.data.allDoctors);
          //setDocID(+allDoctors[0][0])
          //console.log(allDoctors)
        })
  }



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = (event) => {
    
    const enteredID=event.target.innerText;
    //console.log(enteredID)
    if(enteredID.length>0){      

      const doc_array=enteredID.split(" ");
      setDocID(+doc_array[0]);
      //setRosterType(true);
      //console.log(docID);

    }    
    setOpen(false)
  };


  const handleWardClick = (event) => {
    const enteredID=event.target.innerText;
    setWardAnchorEl(event.currentTarget);
    setWardOpen(true)
  };
  const handleWardClose = async(event) => {
    const enteredID=event.target.innerText;
    if(enteredID.length>0){
      setWardID(event.target.innerText)
      //setRosterType(false)
    }   
    setWardOpen(false)
  };


  return (
    <div className='search-ward-main-container' >
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Ward Rosters</h1>
      <div className='wardSearch'> 
        <Button variant="primary" className='req-button-ward-search' style={{height: "3rem",width:"15rem",backgroundColor:"rgb(22, 198, 106)" }} onClick={()=>setRosterType(!rosterType)}>{rosterType ? "show ward rosters":"show individividual rosters"}</Button>
        { rosterType && (<Button variant="primary" className='req-button-ward-search' style={{height: "3rem",width:"13rem" }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            Select doctors</Button> )}
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
          },
        }}
      >
        {allDoctors.map((option) => (
          <MenuItem key={option} value={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option.join(" ")}
          </MenuItem>
        ))}
      </Menu>


      {!rosterType && (<Button variant="primary" className='req-button-ward-search' style={{height: "3rem",width:"13rem" }}
          aria-label="more"
          id="long-button"
          aria-controls={wardOpen ? 'long-menu' : undefined}
          aria-expanded={wardOpen? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleWardClick}>
            Select wards</Button> )}
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={WardAnchorEl}
          open={wardOpen}
          onClose={handleWardClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {wards.map((option) => (
            <MenuItem key={option} value={option} selected={option === 'Pyxis'} onClick={handleWardClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        
      </div>
            
      {rosterType==false ? <WardDetails wardID={wardID}/> : <Doc_details docID={docID}/>}
    </div>
  )
}

export default SearchWardRoster