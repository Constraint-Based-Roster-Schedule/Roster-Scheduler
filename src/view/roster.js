import React, { useState , useEffect} from 'react';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {FaCalendarAlt} from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import IndividualRoster from '../components/individualRoster';
import Axios from "axios";
import Box from '@mui/material/Box';

function RosterIndividual() {
    const numberOfDays=31;

    const [searched,setSearched]=useState(false);
    const [searchDate,setSearchDate]=useState('');

    const [iserror,setisError] =useState(false);
    const [error,setError]=useState('');

    // const [shiftNames,setShiftNames]=useState({});
    //const [myShifts,setMyShifts]=useState({})
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

    const shiftNames=[
    ["Morning Shift","#33ccff"],
    ["Evening Shift","#F58B44"],
    ["Night Shift","#66ff66"],
    ]

    // useEffect(()=>{
    //     //fetchIndividualRoster();
    //     // fetchShiftNames();
    // },[])

    // const fetchIndividualRoster=async()=>{
    //     await Axios.get("http://localhost:5000/user/doctor/getRosterObject").then((res) => {
    //         setMyShifts(res.data.myShifts);
    //         console.log(res.data.myShifts);
    //     })
    // }

    // const fetchShiftNames=async()=>{
    //     await Axios.get("http://localhost:5000/user/doctor/getShiftNames").then((res) => {
    //         setMyShifts(res.data.shiftNames);
    //         console.log(shiftNames);
    //     })
    // }

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
            <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Dr. Harshani's Roster Schedule</h1>
            <div className='requestButton-filter' >
                <Link className='requestButton' to='../shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>
                <div className='legend_roster'>
                    {
                        shiftNames.map((shift)=>{
                            return <div className='legend-container'>
                                <Box className='legend-color' sx={{backgroundColor:`${shift[1]}`}}></Box>
                                <p>{shift[0]}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <IndividualRoster myShifts={myShifts}/>
        </>    
    )
}

export default RosterIndividual
