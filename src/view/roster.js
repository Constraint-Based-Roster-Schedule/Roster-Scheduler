import React, { useState , useEffect} from 'react';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import IndividualRoster from '../components/individualRoster';
import Axios from "axios";
import Box from '@mui/material/Box';

function RosterIndividual() {
    const numberOfDays=31;

    const [searched,setSearched]=useState(false);
    const [searchDate,setSearchDate]=useState('');

    const [iserror,setisError] =useState(false);
    const [error,setError]=useState('');

    
    const [shiftNames,setShiftNames]=useState([]);

    const [finalShifts,setFinalShifts]=useState([]);

    

    useEffect(()=>{
        
        fetchIndividualRoster();
        
        
    },[])

    const fetchIndividualRoster=async()=>{
        
        
        await Axios.get("http://localhost:5000/user/doctor/getRosterObject",{
            params:{"month":"november","year":"2022"}
        }).then((res) => {
        const myShifts=res.data.myShifts;
        const shiftNames=res.data.shiftNames
        // console.log(shiftNames)
        setShiftNames(shiftNames)
        const data_to_send=[]
        myShifts.forEach((day,date)=>{
            day.forEach((shift,index)=>{
                if(shift.includes("1")){
                    const shift_detail={
                        title: shiftNames[index][0],
                        startDate: new Date(2022, 10, date+1, 13, 0),
                        endDate: new Date(2022, 10, date+1, 19, 0),
                        color:shiftNames[index][1],
                    }
                data_to_send.push(shift_detail)
                }     
            })

        });
        setFinalShifts(data_to_send);
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
            <IndividualRoster appointments={finalShifts}/>
        </>    
    )
}

export default RosterIndividual
