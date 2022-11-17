import React, { useState , useEffect} from 'react';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import IndividualRoster from '../components/individualRoster';
import Axios from "axios";
import Box from '@mui/material/Box';
import authService from '../auth_service/auth_services';


function RosterIndividual() {
    
    const [shiftNames,setShiftNames]=useState([]);
    const [myID,setMyID]=useState("");
    useEffect(()=>{
        fetchShiftnames();
        
    },[])


    const fetchShiftnames=async()=>{
        // const my_id =authService.getIntID();
        // console.log(my_id)
        await Axios.get("http://localhost:5000/user/doctor/getShiftNames",{
            params:{"month":"november","year":"2022"}
        }).then((res) => {

            setShiftNames(res.data.shiftNames)
        })
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
            <IndividualRoster docID={authService.getIntID()}/>
        </>    
    )
}

export default RosterIndividual
