import React from "react";
import authService from "../auth_service/auth_services";
import {
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { useState } from "react";
import Axios from "axios";
import axios from "axios";
import '../CSS/generateRoster.css'
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";
export const GenarateRoster = () => {
  const [numOfDoctors, setNumOfDoctors] = useState();
  const [numOfMinimumDoctors, setNumOfMinimumDoctors] = useState();
  const [numOfMaximumDoctors, setNumOfMaximumDoctors] = useState();
  const [numOfMinimumShifts, setNumOfMinimumShifts] = useState();
  const [numOfMaximumShifts, setNumOfMaximumShifts] = useState();
  const [numOfMaxNightShifts, setNumOfMaxNightShifts] = useState();
  const [month, setMonth] = useState();
  const [d, setD] = useState();
  
  const [confirm, setConfirm] = useState('off');
  const wardID = "6339b9cc79b089f956978b20";
  const navigate = useNavigate();

  const getNumOfDoctors = async () => {
    let number = 0;
    let data = { wardID: "6339b9cc79b089f956978b20" };
    await Axios.post(
      "http://localhost:5000/user/consultant/doctorsCount",
      data,
      { headers: { "x-auth-token": authService.getUserToken() } }
    ).then((res) => {
      console.log(res.data.doctorCount);
      setNumOfDoctors(res.data.doctorCount);
    });
    return number;
  };
  function getDaysInMonth(year, month) {
    year = parseInt(year);
    month = parseInt(month);
    setD(new Date(year, month, 0).getDate())
    return new Date(year, month, 0).getDate();
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    if (name == "month") {
      setMonth(value);
      let x = Date.parse(month);
      console.log(x);

      // setM(month.substring(5));
      // setY(month.substring(0, 4));
      // console.log(m, y);
    } else if (name == "numOfDoctors") {
      setNumOfDoctors(value);
      console.log(name, value);
    } else if (name == "numOfMaxDoc") {
      setNumOfMaximumDoctors(value);
      console.log(name, value);
    } else if (name == "numOfMinDoc") {
      setNumOfMinimumDoctors(value);
      console.log(name, value);
    } else if (name == "minShiftPerMonth") {
      setNumOfMinimumShifts(value);
      console.log(name, value);
    } else if (name == "maxShiftPerMonth") {
      setNumOfMaximumShifts(value);
      console.log(name, value);
    } else if (name == "maxNightShifts") {
      setNumOfMaxNightShifts(value);
      console.log(name, value);
    } else if (name == "confirm") {
      setConfirm(value);
      console.log(name, value);
    }
  };
  useState(() => {
    getNumOfDoctors();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ddddddddddddddddddddddd");

    const rosterConstraints = {
      month: month,
      numOfDays: getDaysInMonth(month.substring(5), month.substring(0, 4)),
      numOfDoctors: numOfDoctors,
      numOfMaxNightShifts: numOfMaxNightShifts,
      numOfMaximumDoctors: numOfMaximumDoctors,
      numOfMaximumShifts: numOfMaximumShifts,
      numOfMinimumDoctors: numOfMaximumDoctors,
      numOfMinimumShifts: numOfMinimumShifts,
    };

    axios
      .post(
        "http://localhost:5000/user/consultant/generateRoster",
        rosterConstraints,
        { headers: { "x-auth-token": authService.getUserToken() } }
      )
      .then((res) => {
        console.log(
          month,
          numOfDoctors,
          numOfMaxNightShifts,
          numOfMaximumDoctors,
          numOfMaximumShifts,
          numOfMinimumDoctors,
          numOfMinimumShifts
        );

        if (res.data.success) {
          alert(res.data.msg);
          navigate("../wardRoster");
        } else {
          console.log("no roster for this constraints");
          alert(res.data.msg);
          refresh();
          navigate("../generateRoster");
        }
      });
  };
  const refresh = () => {
    console.log("wwwe");
    setConfirm('off');
    setMonth("");
    setNumOfMaxNightShifts("");
    setNumOfMaximumDoctors("");
    setNumOfMaximumShifts("");
    setNumOfMinimumDoctors("");
    setNumOfMinimumShifts("");
  };

  return (
    <div className="generateRosterContainer">
    <MDBContainer className="py-5"style={{ backgroundColor: "rgb(255, 255, 255)", marginTop: "0px" }}>
      <MDBRow>
        <h1 className="mb-3">Generate Roster</h1>
      </MDBRow>

      <form onSubmit={handleSubmit} style={{alignItems:"flex" ,display:'block'}}>
        <MDBRow >
          <MDBCol >
            
            <MDBInput
              className="mb-3"
              label="Month"
              type="month"
              id="month"
              name="month"
              onChange={handleChange}
              value={month}
            />
          </MDBCol>
          <MDBCol >
            <MDBInput
              className="mb-3"
              label="Number of Doctors           "
              type="number"
              min="0"
              max="10"
              id="numberOfDoctors"
              name="numOfDoctors"
              onChange={handleChange}
              required
              readOnly
              value={numOfDoctors}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              className="mb-3"
              label="Number of Maximum doctor for shift"
              type="number"
              id="numOfMaxDoc"
              name="numOfMaxDoc"
              min="1"
              max={numOfDoctors}
              onChange={handleChange}
              value={numOfMaximumDoctors}
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              className="mb-3"
              type="number"
              label="Number of Minimum doctor for shift"
              min={1}
              max={numOfDoctors}
              id="numberOfMinDoc"
              name="numOfMinDoc"
              onChange={handleChange}
              value={numOfMinimumDoctors}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              className="mb-3"
              label="Maximum shifts per month"
              type="number"
              name="maxShiftPerMonth"
              onChange={handleChange}
              value={numOfMaximumShifts}
              min='0'
              max={numOfDoctors*d}
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              className="mb-3"
              type="number"
              label="Minimum shifts per month"
              onChange={handleChange}
              name="minShiftPerMonth"
              value={numOfMinimumShifts}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              className="mb-3"
              label="Maximum night shifts per doctor"
              type="number"
              name="maxNightShifts"
              onChange={handleChange}
              value={numOfMaxNightShifts}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBCheckbox
              className="mb-3"
              type="checkbox"
              id="invalidCheck"
              label="Confirm all the conditions"
              name="confirm"
              onChange={handleChange}
              required
              value={confirm}
            />

            <div class="invalid-feedback">
              You must agree before submitting details.
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{alignItems:'center', display:'flex'}}>
          <MDBCol>
            <MDBBtn type="submit">Generate</MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn type="button" onClick={refresh}>
              Refresh
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
    </div>
  );
};
export default GenarateRoster;
