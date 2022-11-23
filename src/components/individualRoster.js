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
import config from '../config.json';
import Loader from './Loader';

function IndividualRoster(props){
  const currentDate = '2022-11-05';
  const [docID,setDocID]=useState("");
  const [shiftNames,setShiftNames]=useState([]);
  const [finalShifts,setFinalShifts]=useState([]);
  const [current,setCurrent]=useState('')
  const [isLoading,setIsLoading]=useState(true)

  const APIEndpoint=config.DOMAIN_NAME+"/user";

  useEffect(()=>{

      setIsLoading(true);
      fetchIndividualRoster();  
      
      setTimeout(()=>{
        setIsLoading(false)
      },2000)
      //console.log(props.docID)  
  },[props.docID])

  useEffect(()=>{
    getCurrentDate();
  },[])

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

        //console.log([year, month, day].join('-'))
        setCurrent([year, month, day].join('-'))
    }

  const fetchIndividualRoster=async()=>{
      // const wardID=authService.getWardID();
      //console.log(props.myID)
      const myID=props.docID;
      
      //console.log(myID)
      
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
      
      //console.log(required_months); 

      await Axios.get(APIEndpoint+"/doctor/getRosterObject",{
          headers: { "x-auth-token": authService.getUserToken() },
          params:{"month":monthNames[current_month],"year":current_year,"months":required_months,"wardID":props.wardID}
      },).then((res) => {
      const myShifts=res.data.myShifts;
      const shiftNames=res.data.shiftNames
      console.log(myShifts)
      setShiftNames(shiftNames)
      const data_to_send=[]
      myShifts.forEach((mon,month_index)=>{
          var displaying_month=0;
                if(myShifts.length>1){
                    displaying_month=current_month+month_index-2
                }else{
                    displaying_month=current_month+1
                }
          mon.forEach((day,date)=>{
              day.forEach((shift,index)=>{
                  if(shift.includes(+myID)){
                      const shift_detail={
                          title: shiftNames[month_index][index][0],
                          startDate: new Date(+current_year, displaying_month, date+1, 13, 0),
                          endDate: new Date(+current_year, displaying_month, date+1, 19, 0),
                          color:shiftNames[month_index][index][1],
                      }
                      data_to_send.push(shift_detail)
                  }     
              })

          });
      })
      
      setFinalShifts(data_to_send);
      console.log(finalShifts);
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

if(isLoading){
  return <div data-testid="individual-roster"><Loader /></div>
}else
  {return (
     <div data-testid="individual-roster" className='individual_roster_month_week'>
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
  );}

  }

export default IndividualRoster;

