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



function WardRosterComponent(props) {
    const [windowSize,setWindowSize]=useState(getWindowSize());
    const currentDate = '2022-11-05';
    const [shiftNames,setShiftNames]=useState([]);

    const [finalShifts,setFinalShifts]=useState([]);

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
    },[props.wardID])


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
            params:{"month":"november","year":"2022","months":required_months,"wardID":props.wardID}
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
        <div className='individual_roster_month_week'>
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