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



function WardRosterComponent(props) {
    const [windowSize,setWindowSize]=useState(getWindowSize());
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
                <Scheduler data={props.appointments} height={660} >
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

export default WardRosterComponent