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
import { useState,useEffect } from 'react';
import Axios from "axios";
import authService from '../auth_service/auth_services';



function IndividualRoster(){
  const currentDate = '2022-11-05';
  const [docID,setDocID]=useState("");
  const [shiftNames,setShiftNames]=useState([]);
  const [finalShifts,setFinalShifts]=useState([]);

  useEffect(()=>{
      fetchIndividualRoster();       
  },[])

  const fetchIndividualRoster=async(props)=>{
      // const wardID=authService.getWardID();
      //console.log(props.myID)
      // const myID=props.docID;
      // if(props.docID.length===0){
      //   myID=authService.getIntID().toString();
      // }else{
      //   myID=props.myID
      // }
      
      //console.log(myID)
      
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
      console.log(myShifts)
      setShiftNames(shiftNames)
      const data_to_send=[]
      myShifts.forEach((mon,month_index)=>{
          mon.forEach((day,date)=>{
              day.forEach((shift,index)=>{
                  if(shift.includes("1")){
                      const shift_detail={
                          title: shiftNames[index][0],
                          startDate: new Date(2022, 10+month_index-2, date+1, 13, 0),
                          endDate: new Date(2022, 10+month_index-2, date+1, 19, 0),
                          color:shiftNames[index][1],
                      }
                      data_to_send.push(shift_detail)
                  }     
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


  return (
    <div className='individual_roster_month_week'>
      <Paper className='calender_individual_month'>
        <Scheduler
          data={finalShifts}
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

