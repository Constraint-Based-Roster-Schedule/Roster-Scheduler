import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WardRosterComponent from '../components/wardRosterComponent';
import Axios from "axios";
import Box from '@mui/material/Box';


function  WardRoster() {

    const [shiftNames,setShiftNames]=useState([]);
    const [docID,setDocID]=useState("");

    const [finalShifts,setFinalShifts]=useState([]);

    useEffect(()=>{
        fetchIndividualRoster();       
    },[])

    const fetchIndividualRoster=async()=>{
        
        const monthNames = ["january", "february", "march", "april", "may", "june",
                            "july", "august", "september", "october", "november", "december"
                            ];
        const current_month=new Date().getMonth();
        const required_months=[]
        required_months.push(monthNames[current_month-2]);
        required_months.push(monthNames[current_month-1]);
        required_months.push(monthNames[current_month]);
        required_months.push(monthNames[current_month+1]);
        
        console.log(required_months); 

        await Axios.get("http://localhost:5000/user/doctor/getRosterObject",{
            params:{"month":"november","year":"2022","months":required_months}
        }).then((res) => {
        const myShifts=res.data.myShifts;
        const shiftNames=res.data.shiftNames
        console.log(shiftNames)
        setShiftNames(shiftNames)
        const data_to_send=[]
        myShifts.forEach((mon,month_index)=>{
            mon.forEach((day,date)=>{
                day.forEach((shift,index)=>{
                    const shift_string=shift.join(" , ")
                    //console.log(shift_string)
                    const shift_detail={
                        title: shift_string,
                        startDate: new Date(2022, 10+month_index-2, date+1, shiftNames[index][2][0][0], shiftNames[index][2][0][1]),
                        endDate: new Date(2022, 10+month_index-2,date+1, shiftNames[index][2][1][0], shiftNames[index][2][1][1]),
                        color:shiftNames[index][1],
                    }
                    data_to_send.push(shift_detail)
                        
                })

            });
        })
        
        setFinalShifts(data_to_send);
        })
    }


    return (
        <>
            <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>Roster Schedule of ward number 1</h1>
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
            <WardRosterComponent appointments={finalShifts}/>
        </>        
    )
}

export default WardRoster
