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
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function SearchWardRoster() {

  const [rosterType,setRosterType]=useState(false);
  const [wardID,setWardID]=useState(1);
  const [wards,setWards]=useState([]);
  const [error,setError]=useState("");
  const [isError,setIsError]=useState(false);


  const [wardOpen,setWardOpen] = useState(false);
  const ITEM_HEIGHT = 120;
  const [docID, setDocID] = React.useState(null);
  const [open,setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false)
  const [WardAnchorEl, setWardAnchorEl] = useState(false)

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
    
    //console.log(wardID);
  }

  const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
  ];


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = (event) => {
    setDocID(event.target.innerText)
    setOpen(false)
  };


  const handleWardClick = (event) => {
    setWardAnchorEl(event.currentTarget);
    setWardOpen(true)
  };
  const handleWardClose = (event) => {
    setWardID(event.target.innerText)
    setWardOpen(false)
  };


  return (
    <>
      <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Ward Rosters</h1>
      <div className='wardSearch'> 
        <Button variant="primary" className='req-button-ward-search' style={{backgroundColor:"rgb(205, 37, 33)",height: "3rem",width:"13rem" }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
            Show doctors</Button> 
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
            width: '60ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>


      <Button variant="primary" className='req-button-ward-search' style={{backgroundColor:"rgb(205, 37, 33)",height: "3rem",width:"13rem" }}
          aria-label="more"
          id="long-button"
          aria-controls={wardOpen ? 'long-menu' : undefined}
          aria-expanded={wardOpen? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleWardClick}>
            Show wards</Button> 
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
            width: '60ch',
          },
        }}
      >
        {wards.map((option) => (
          <MenuItem key={option} value={option} selected={option === 'Pyxis'} onClick={handleWardClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>


        {/* <div className='alert-text'>
                
          <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
              <SingleBedIcon/></InputAdornment>}} id="filled-basic" label="Ward" variant="outlined" onChange={handleSelectWard}  />
          {isError && <Alert className='wardNumber-alert' severity="warning">{error}...</Alert>}
        </div> */}
        
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