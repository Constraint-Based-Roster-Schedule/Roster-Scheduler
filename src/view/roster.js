import React, { useState , useEffect} from 'react';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import IndividualRoster from '../components/individualRoster';
import Axios from "axios";
import Box from '@mui/material/Box';
import authService from '../auth_service/auth_services';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import config from '../config.json';


function RosterIndividual() {
    
    const [shiftNames,setShiftNames]=useState([]);
    const [myID,setMyID]=useState("");
    const ITEM_HEIGHT = 120;
    const [isMyroster,setIsMyRoster]=useState(true);
    const [searched,setSearched]=useState(2);
    const [wardDoctors,setWardDoctors]=useState([]);
    const [anchorEl, setAnchorEl] = useState(false);
    const [open,setOpen] = useState(false);
    const [months,setMonths]=useState([]);

    const APIEndpoint=config.DOMAIN_NAME+"/user";

    useEffect(()=>{
        fetchShiftnames();
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
        //setRosterType(true);
        //console.log(docID);

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

        await Axios.get(APIEndpoint+"/doctor/getShiftNamesForRoster",{
            headers: { "x-auth-token": authService.getUserToken() },
            params:{"month":monthNames[current_month],"year":current_year,"wardID":authService.getWardID().toString(),"months":required_months}
        }).then((res) => {

            setShiftNames(res.data.shiftNames)
        })
    }

    const fetchWardDoctors=async()=>{
        const ward_id=authService.getWardID();
        await Axios.get(APIEndpoint+"/doctor/getWardDoctors",{
            headers: { "x-auth-token": authService.getUserToken() },
            params:{"wardID":ward_id}
        }).then((res) => {
            setWardDoctors(res.data.doctorDetails);
        })
    }


    return (
        <section className='roster-section'>
            <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem"}}>My Roster Schedule</h1>
            <div className='requestButton-filter' >
                <Link className='requestButton' to='../shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>
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
                <Button variant="primary" className='isMyRoster-button' style={{height: "3rem" }} onClick={()=>setIsMyRoster(!isMyroster)}>{isMyroster ? "Search other rosters":"Show my roster"}</Button>
                { !isMyroster && (<Button variant="primary" className='doctor-search-roster-button' style={{height: "3rem" }}
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}>
                        Select doctor</Button> )}
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
            <IndividualRoster docID={isMyroster ? authService.getIntID(): searched} wardID={authService.getWardID().toString()}/>

        </section>    
    )
}

export default RosterIndividual
