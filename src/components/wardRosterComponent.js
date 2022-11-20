import * as React from 'react';
import { useEffect,useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import '../CSS/wardRosterComponent.css';
import {appointments} from './data';
import Axios from "axios";
import authService from '../auth_service/auth_services';


function WardRosterComponent(props) {
    const [windowSize,setWindowSize]=useState(getWindowSize());
    const [shiftNames,setShiftNames]=useState([]);
    const [current,setCurrent]=useState('')
    const [finalShifts,setFinalShifts]=useState([]);
    const currentDate = '2022-11-05';

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        
    },);

    useEffect(()=>{
        fetchIndividualRoster();
        getCurrentDate();
    },[props.wardID])

    const getCurrentDate=()=>{
        const d=new Date();
        const day=''+d.getDate();
        const month=''+d.getMonth()+1;
        const year=''+d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
            
        if (day.length < 2) {
            day = '0' + day;
        }

        console.log([year, month, day].join('-'))
        setCurrent([year, month, day].join('-'))
    }

    const fetchIndividualRoster=async()=>{
        
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
        
        console.log(required_months); 

        await Axios.get("http://localhost:5000/user/doctor/getRosterObject",{
            headers: { "x-auth-token": authService.getUserToken() },
            params:{"month":monthNames[current_month],"year":current_year,"months":required_months,"wardID":props.wardID}
        }).then((res) => {
            const myShifts=res.data.myShifts;
            const shiftNames=res.data.shiftNames
            console.log(shiftNames)
            console.log(myShifts)
            setShiftNames(shiftNames)
            const data_to_send=[]
            myShifts.forEach((mon,month_index)=>{
                mon.forEach((day,date)=>{
                    day.forEach((shift,index)=>{
                        const shift_string=shift.join(" , ")
                        console.log(shiftNames[month_index][index][1])
                        const shift_detail={
                            title: shift_string,
                            startDate: new Date(+current_year, current_month+month_index-2, date+1, shiftNames[month_index][index][2][0][0], shiftNames[month_index][index][2][0][1]),
                            endDate: new Date(+current_year, current_month+month_index-2,date+1, shiftNames[month_index][index][2][1][0], shiftNames[month_index][index][2][1][1]),
                            color:shiftNames[month_index][index][1],
                        }
                        data_to_send.push(shift_detail)
                            
                    })

                });
            })
        console.log(data_to_send)
        setFinalShifts(data_to_send);
        console.log(data_to_send)
        })
    }



    const Appointment = ({ children, style, data, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: data.color
            }}
            
            >
            {children}
        </Appointments.Appointment>
    );

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }


    return (
        <div data-testid="ward-roster" className='individual_roster_month_week'>
            <Paper className='calender_individual_month'>
                <Scheduler data={finalShifts} height={660} >
                        <ViewState
                            defaultCurrentDate={currentDate}
                        />
                        <MonthView />
                        <DayView
                            startDayHour={6}
                            endDayHour={24}
                            cellDuration={60}
                        />
                        <Toolbar />
                        {windowSize.innerWidth<750 && <ViewSwitcher />}
                        <DateNavigator/>
                        <TodayButton />
                    <Appointments appointmentComponent={Appointment} />
                </Scheduler>
            </Paper>
        </div>
    )
}

export default WardRosterComponent;