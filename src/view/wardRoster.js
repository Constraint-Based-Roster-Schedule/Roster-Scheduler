import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {FaCalendarAlt} from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import WardRosterComponent from '../components/wardRosterComponent';
import rosterObject from '../components/rosterObject';


function  WardRoster() {
    const wardShifts=rosterObject;
    const numberOfDays=31;

    const [searched,setSearched]=useState(false);
    const [searchDate,setSearchDate]=useState('');

    const [iserror,setisError] =useState(false);
    const [error,setError]=useState('');

    const handleSearch=(e)=>{         
            var search=e.target.value;          
            if(isNaN(search) && search.length!=0){
                setisError(true);
                setError(`You can only enter numbers from 1 to ${numberOfDays}`);
                setSearched(false);
            }else if((search<1 || search>numberOfDays) && search.length!=0){
                setisError(true);
                setError(`You can only enter numbers from 1 to ${numberOfDays}`);
                setSearched(false);
            }else{
                setisError(false);
                setSearched(true);
                setError('');
            }
        }


    return (
        <>
            <div className='ward-requestButton-filter' >
                <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
                    <FaCalendarAlt/></InputAdornment>}} id="filled-basic" label="Date" variant="outlined"  onChange={(e)=>{setSearchDate(e.target.value) ;handleSearch(e)}} />
                {iserror && <Alert severity="warning" >{error}...</Alert>}
                <Link className='ward-requestButton' to='/shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
            </div>
            {searched && searchDate.length>0 && (
                <div className='individual-ward-rosterContainer'>
                    <Row>
                        <Col className='ward-roster-column'>Date</Col>
                        <Col className='ward-roster-column'>{searchDate}</Col>
                    </Row>
                    <Row>
                        <Col className='ward-roster-column'>Morning shift</Col>
                        <Col className='ward-roster-column'></Col>
                    </Row>
                    <Row>
                        <Col className='ward-roster-column'>Evening Shift</Col>
                        <Col className='ward-roster-column'></Col>
                    </Row>
                    <Row>
                        <Col className='ward-roster-column'>Night shift</Col>
                        <Col className='ward-roster-column'></Col>
                    </Row>
                </div>
            )}
            <WardRosterComponent wardShifts={wardShifts} numberOfDays={numberOfDays}/>
        </>
        
    )
}

export default WardRoster
