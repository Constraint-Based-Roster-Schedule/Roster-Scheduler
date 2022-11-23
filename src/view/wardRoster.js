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
import config from '../config.json';

function  WardRoster() {
    const [shiftNames,setShiftNames]=useState([]);
    const [wardName,setWardName]=useState("");
    const [months,setMonths]=useState([])

    const APIEndpoint=config.DOMAIN_NAME+"/user";

    useEffect(()=>{
        fetchShiftnames();
        getWardName()
    },[])


    const fetchShiftnames=async()=>{
    const monthNames = ["january", "february", "march", "april", "may", "june",
                            "july", "august", "september", "october", "november", "december"
                            ];
        const current_month=new Date().getMonth();
        const current_year=new Date().getFullYear();
        const required_months=[]
        required_months.push(monthNames[current_month-2]);
        required_months.push(monthNames[current_month-1]);
        required_months.push(monthNames[current_month]);
        required_months.push(monthNames[current_month+1]);
        setMonths(required_months); 
        console.log(authService.getWardID().toString())
        await Axios.get(APIEndpoint+"/doctor/getShiftNamesForRoster",{
            params:{"month":monthNames[current_month],"year":current_year,"wardID":authService.getWardID().toString(),"months":required_months}
        }).then((res) => {

            setShiftNames(res.data.shiftNames)
        })
    }

    const getWardName=async()=>{
        await Axios.get(APIEndpoint+"/doctor/getWardNamebyID",{
            params:{"wardID":authService.getWardID().toString()}
        }).then((res) => {

            setWardName(res.data.wardNumber)
        })
    }

    return (
        <section data-testid="ward-roster-page" className='ward-roster-section'>
            <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Roster Schedule of ward number {wardName}</h1>
            <div className='ward-requestButton-filter' >                
                <Link className='ward-requestButton' to='../shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
                <div className='main-legend-container'>
                    {shiftNames.map((monthShiftNames,index)=>{
                        return <div className='legend_roster'>
                            <p style={{marginRight:"2rem"}} className='legend-text'><b>{months[index]} : </b></p>
                            {
                                monthShiftNames.map((shift)=>{
                                    return <div className='legend-container'>
                                        <Box className='legend-color' sx={{backgroundColor:`${shift[1]}`}}></Box>
                                        <p className='legend-text' style={{marginRight:"1rem"}}>{shift[0]}</p>
                                    </div>
                                })
                            }
                        </div>
                    })}

                </div>
            </div>
            <WardRosterComponent wardID={authService.getWardID()!==null && authService.getWardID().toString()}/>
        </section>        
    )
}

export default WardRoster
