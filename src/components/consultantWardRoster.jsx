import React from 'react';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import WardRosterComponent from '../components/wardRosterComponent';
import IndividualRoster from './individualRoster';
import Box from '@mui/material/Box';
import Axios from "axios";
import authService from '../auth_service/auth_services';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ConsultantWardRoster = () => {
  const [shiftNames,setShiftNames]=useState([]);
  const [wardName,setWardName]=useState("");
  const [wardDoctors,setWardDoctors]=useState([]);
  const [anchorEl, setAnchorEl] = useState(false);
  const [open,setOpen] = useState(false);
  const [searched,setSearched]=useState(2);
  const ITEM_HEIGHT = 120;
  const [isWardRoster,setIsWardRoster]=useState(true);
  const [months,setMonths]=useState([])

  useEffect(()=>{
      fetchShiftnames();
      getWardName();
      fetchWardDoctors();
  },[])


  const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleClose = (event) => {
        
        const enteredID=event.target.innerText;
        if(enteredID.length>0){      

        const doc_array=enteredID.split(" ");
        setSearched(+doc_array[0]);


        }    
        setOpen(false)
    };

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
        await Axios.get("http://localhost:5000/user/doctor/getShiftNamesForRoster",{
            params:{"month":monthNames[current_month],"year":current_year,"wardID":authService.getWardID().toString(),"months":required_months}
        }).then((res) => {

            setShiftNames(res.data.shiftNames)
        })
    }



  const getWardName=async()=>{
      await Axios.get("http://localhost:5000/user/consultant/getWardNamebyID",{
        headers: { "x-auth-token": authService.getUserToken() },
        params:{"wardID":authService.getWardID().toString()}
      }).then((res) => {

          setWardName(res.data.wardNumber)
      })
  }

    const fetchWardDoctors=async()=>{
        await Axios.get("http://localhost:5000/user/doctor/getWardDoctors",{
            headers: { "x-auth-token": authService.getUserToken() },
            params:{"wardID":authService.getWardID().toString()}
        }).then((res) => {
            setWardDoctors(res.data.doctorDetails);
        })
    }



  return (
    <div style={{marginTop:"5rem"}}>
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
        <div className='select-rosterType'>
          <Button variant="primary" className='isMyRoster-button' style={{height: "3rem" }} onClick={()=>setIsWardRoster(!isWardRoster)}>{isWardRoster ? "Search individual rosters":"Show ward roster"}</Button>
          {!isWardRoster && <Button variant="primary" className='doctor-search-roster-button' style={{height: "3rem" }}
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
                Select doctor</Button>} 
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
                width: '30ch',
            },
            }}
        >
            {wardDoctors.map((option) => (
            <MenuItem key={option} value={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option[0]} {option[1]} {option[2]}
            </MenuItem>
            ))}
        </Menu>
        </div>
        
      {isWardRoster ? <WardRosterComponent wardID={authService.getWardID().toString()}/> : <IndividualRoster docID={searched} wardID={authService.getWardID().toString()}/>}
    </div>  
  )
}

export default ConsultantWardRoster