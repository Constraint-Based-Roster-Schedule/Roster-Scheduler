import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import "../CSS/wardRosterComponent.css";
import { appointments } from "./data";
import Axios from "axios";

function WardRosterTestComponent(props) {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const currentDate = "2022-11-05";
  const [shiftNames, setShiftNames] = useState([]);

  const [finalShifts, setFinalShifts] = useState([]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    fetchIndividualRoster();
    console.log(props.roster);
  }, []);

  const fetchIndividualRoster = async () => {
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const current_month = new Date().getMonth();
    const required_months = [props.month];

    console.log(required_months);

    const myShifts = props.roster;
    const shiftNames = props.shiftNames;
    const year=props.year
    const month=props.month
    console.log(shiftNames,year,month);
    setShiftNames(shiftNames);
    const data_to_send = [];
   
      myShifts.forEach((day, date) => {
        day.forEach((shift, index) => {
          console.log(shift)
          const shift_string = shift.join(" , ");
          //console.log(shift_string)
          const shift_detail = {
            title: shift_string,
            startDate: new Date(
              2022,
              10 ,
              date + 1,
              shiftNames[index][2][0][0],
              shiftNames[index][2][0][1]
            ),
            endDate: new Date(
              2022,
              10 ,
              date + 1,
              shiftNames[index][2][1][0],
              shiftNames[index][2][1][1]
            ),
            color: shiftNames[index][1],
          };
          data_to_send.push(shift_detail);
        });
      });
    ;

    setFinalShifts(data_to_send);
  };

  const Appointment = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.color,
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <div className="individual_roster_month_week">
      <Paper className="calender_individual_month">
        <Scheduler data={finalShifts} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView />
          <DayView startDayHour={6} endDayHour={24} cellDuration={60} />
          <Toolbar />
          {windowSize.innerWidth < 750 && <ViewSwitcher />}
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default WardRosterTestComponent;
