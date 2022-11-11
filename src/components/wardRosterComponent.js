import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import '../CSS/wardRosterComponent.css';
import {appointments} from './data';



function WardRosterComponent() {
    
    const currentDate = '2022-11-05';

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

    return (
        <div className='individual_roster_month_week'>
            <Paper className='calender_individual_month'>
                <Scheduler data={appointments} height={660}>
                        <ViewState
                            defaultCurrentDate={currentDate}
                        />
                        <WeekView startDayHour={0} endDayHour={24} cellDuration={120} />
                        <Toolbar />
                        <DateNavigator/>
                        <TodayButton />
                    <Appointments appointmentComponent={Appointment} />
                </Scheduler>
            </Paper>
        </div>
    )
}

export default WardRosterComponent