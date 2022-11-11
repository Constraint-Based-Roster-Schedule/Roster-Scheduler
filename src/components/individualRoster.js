import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './data';
import '../CSS/rosterIndividual.css';
import { useState } from 'react';

function IndividualRoster(props){
  const currentDate = '2022-11-05';

  const getMOnthYear=()=>{
    console.log("click kara")
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


  return (
    <div className='individual_roster_month_week'>
      <Paper className='calender_individual_month'>
        <Scheduler
          data={props.appointments}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator onNavigate={()=>console.log("hello")}/>
          <TodayButton />
          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    </div>  
  );

}

export default IndividualRoster;

