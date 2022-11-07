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
export default () => (
  <div className='individual_roster_month_week'>
    <Paper className='calender_individual_month'>
      <Scheduler
        data={appointments}
      >
        <ViewState
          defaultCurrentDate={currentDate}
        />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  </div>  
);
