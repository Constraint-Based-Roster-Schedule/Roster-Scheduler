import React from 'react';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import WardRosterComponent from '../components/wardRosterComponent';
import Box from '@mui/material/Box';
import Axios from "axios";
import authService from '../auth_service/auth_services';

function  WardRoster() {
    const [shiftNames,setShiftNames]=useState([]);
    const [wardName,setWardName]=useState("")
    useEffect(()=>{
        fetchShiftnames();
        getWardName()
    },[])


    const fetchShiftnames=async()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month=monthNames[new Date().getMonth()].toLowerCase();
    const year=new Date().getFullYear();
    console.log(authService.getWardID().toString())
        await Axios.get("http://localhost:5000/user/doctor/getShiftNames",{
            params:{"month":month,"year":year,"wardID":authService.getWardID().toString()}
        }).then((res) => {

            setShiftNames(res.data.shiftNames)
        })
    }

    const getWardName=async()=>{
        await Axios.get("http://localhost:5000/user/doctor/getWardNamebyID",{
            params:{"wardID":authService.getWardID().toString()}
        }).then((res) => {

            setWardName(res.data.wardNumber)
        })
    }

    return (
        <section style={{marginTop:"5rem"}}>
            <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Roster Schedule of ward number {wardName}</h1>
            <div className='ward-requestButton-filter' >                
                <Link className='ward-requestButton' to='../shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
                <div className='legend_roster-ward'>
                    {
                        shiftNames.map((shift)=>{
                            return <div className='legend-container-ward'>
                                <Box className='legend-color-ward' sx={{backgroundColor:`${shift[1]}`}}></Box>
                                <p>{shift[0]}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <WardRosterComponent wardID={authService.getWardID().toString()}/>
        </section>        
    )
}

export default WardRoster
