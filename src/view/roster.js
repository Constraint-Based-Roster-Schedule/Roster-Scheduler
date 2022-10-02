import React, { useState , useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {FaCalendarAlt} from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import IndividualRoster from '../components/individualRoster';

function RosterIndividual() {
    const numberOfDays=31;
    const myShifts={
        "1":[0,1,0],
        "2":[1,0,0],
        "3":[0,1,1],
        "4":[1,1,0],
        "5":[1,0,1],
        "6":[1,1,0],
        "7":[0,1,0],
        "8":[0,1,1],
        "9":[1,1,0],
        "10":[0,1,1],
        "11":[1,0,0],
        "12":[1,1,0],
        "13":[0,1,1],
        "14":[0,1,0],
        "15":[1,0,1],
        "16":[1,1,0],
        "17":[0,1,1],
        "18":[1,0,0],
        "19":[1,1,0],
        "20":[1,0,1],
        "21":[0,1,1],
        "22":[0,1,1],
        "23":[0,0,0],
        "24":[0,1,0],
        "25":[1,0,0],
        "26":[0,1,1],
        "27":[1,0,1],
        "28":[0,1,1],
        "29":[0,1,1],
        "30":[0,1,0],
        "31":[1,0,1],
    };

    const shiftNames={
        '1':"Morning Shift",
        "2":"Evening Shift",
        "3":"Night Shift",
    }

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
            <div className='requestButton-filter' >
                <TextField className='filter-bar' InputProps={{startAdornment: <InputAdornment position="start" style={{color:"blue" , backgroundColor: "blue"}}>
                    <FaCalendarAlt/></InputAdornment>}} id="filled-basic" label="Date" variant="outlined"  onChange={(e)=>{setSearchDate(e.target.value) ;handleSearch(e)}} />
                {iserror && <Alert severity="warning" >{error}...</Alert>}
                <Link className='requestButton' to='/shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
            </div>
            {searched && searchDate.length>0 && (
                <div className='individual-rosterContainer'>
                    <Row>
                        <Col className='roster-column'>Date</Col>
                        <Col className='roster-column'>{searchDate}</Col>
                    </Row>

                    {shiftNames.map((shift)=>{
                        return(
                            <Row>
                                <Col className='roster-column'>Morning shift</Col>
                                <Col className='roster-column'></Col>
                            </Row>
                        );
                    })}
                    {/* <Row>
                        <Col className='roster-column'>Morning shift</Col>
                        <Col className='roster-column'></Col>
                    </Row>
                    <Row>
                        <Col className='roster-column'>Evening Shift</Col>
                        <Col className='roster-column'></Col>
                    </Row>
                    <Row>
                        <Col className='roster-column'>Night shift</Col>
                        <Col className='roster-column'></Col>
                    </Row> */}
                </div>
            )}
            <IndividualRoster numberOfDays={numberOfDays} myShifts={myShifts}/>
        </>    
    )
}

export default RosterIndividual
