import React from 'react';
import '../CSS/searchWardRoster.css';
import WardRosterComponent from '../components/wardRosterComponent';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function searchWardRoster() {
  return (
    <>
      <div className='wardSearch'>
        <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
            <SingleBedIcon/></InputAdornment>}} id="filled-basic" label="Ward" variant="outlined"  />
        <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
            <CalendarMonthIcon/></InputAdornment>}} id="filled-basic" label="Month" variant="outlined"  />
      </div>
    </>
  )
}

export default searchWardRoster