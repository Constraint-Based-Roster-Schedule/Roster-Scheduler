import React, { useEffect } from "react";
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
import "../CSS/generateRoster.css";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";
import { Padding } from "@mui/icons-material";
export const GenarateRoster = () => {
  const [numOfDoctors, setNumOfDoctors] = useState();
  const [numOfMinimumDoctors, setNumOfMinimumDoctors] = useState();
  const [numOfMaximumDoctors, setNumOfMaximumDoctors] = useState();
  const [numOfMinimumShifts, setNumOfMinimumShifts] = useState();
  const [numOfMaximumShifts, setNumOfMaximumShifts] = useState();
  const [numOfMaxNightShifts, setNumOfMaxNightShifts] = useState();
  const [month, setMonth] = useState();
  const [d, setD] = useState();
  const [numOfShift, setNumOfShifts] = useState([]);
  const [shiftArray,setShiftArray]=useState([
  ]);
  const [shiftArrayData,setShiftArrayData]=useState([])
  const [confirm, setConfirm] = useState("off");

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
      console.log('doctor count',res.data.doctorCount);
      setNumOfDoctors(res.data.doctorCount);
    });
    return number;
  };
  function getDaysInMonth(year, month) {
    year = parseInt(year);
    month = parseInt(month);
    setD(new Date(year, month, 0).getDate());
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
    } else if(name=="numOfShift"){
      setNumOfShifts(value);
      var arr=[]
      for(var i=0;i<value;i++){
        arr.push({key:i,value:i})
      }
      setShiftArray(arr)
    }
  };

  useEffect(() => {
    getNumOfDoctors();
  });
  const shiftchange = (e) =>{
    console.log(e.target.value);
    setShiftArrayData(
    ...shiftArrayData,[1],e.target.value)
    console.log(shiftArrayData);
  }
  const array1 = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
  ];
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
  const saveshift=async(e)=>{
    e.preventDefault();
    const details={
      month:'november',
      year:'2022',
      wardID:1,
      shifts:{
        0:{
          0:'morning shift',
          1:'#eeeeee',
          2:{
            0:{
              0:2,
              1:20
            },
            1:{
              0:3,
              1:30
            }
          }
        },
        1:{
          0:'evening shift',
          1:'#68e113',
          2:{
            0:{
              0:2,
              1:20
            },
            1:{
              0:3,
              1:30
            }
          }
        },
        2:{
          0:'night shift',
          1:'#ef0808',
          2:{
            0:{
              0:2,
              1:20
            },
            1:{
              0:3,
              1:30
            }
          }
        }
      }

    }
  }
  const refresh = () => {
    console.log("wwwe");
    setConfirm("off");
    setMonth("");
    setNumOfMaxNightShifts("");
    setNumOfMaximumDoctors("");
    setNumOfMaximumShifts("");
    setNumOfMinimumDoctors("");
    setNumOfMinimumShifts("");
  };

  return (
    <div className="generateRosterContainer">
      <MDBContainer
        className="py-5"
        style={{ backgroundColor: "rgb(255, 255, 255)", marginTop: "0px" }}
      >
        <MDBRow>
          <h1 className="mb-3">Generate Roster</h1>
          {/* <MDBBtn onClick={saveshift}>save shifts</MDBBtn> */}
        </MDBRow>

        <form
          onSubmit={handleSubmit}
          style={{ alignItems: "flex", display: "block" }}
        >
          <MDBRow>
            <MDBCol>
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
            <MDBCol>
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
                min="0"
                max={numOfDoctors * d}
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
          <MDBRow
            style={{
              alignItems: "center",
              display: "flex",
              marginBottom: "10px",
            }}
          >
            <MDBCol>
              <MDBBtn type="submit">Generate</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn type="button" onClick={refresh}>
                Refresh
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          {/* <div className="shiftDetailsContainer">
            <MDBRow>
              <MDBCol>
                <MDBInput
                  type="number"
                  label="shift count per day"
                  required
                  className="mb-3"
                  min='1'
                 
                  name='numOfShift'
                  value={numOfShift}
                  onChange={handleChange}
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            
         
            <MDBRow>
              
              {shiftArray.map((arr,index) => (
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      label={'shift '+arr.value}
                      key={arr.key}
                      type="text"
                      onChange={shiftchange}
                    ></MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label={arr.value}
                      key={arr.key}
                      type="color"
                      onChange={shiftchange}
                      style={{
                       
                        display: "block",
                        height: "38px",
                      }}
                    ></MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label='starting time' type='time'onChange={shiftchange}></MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label='Ending time' type='time'onChange={shiftchange}></MDBInput>
                  </MDBCol>
                </MDBRow>
              ))}
            </MDBRow>
          </div> */}
        </form>
        <div className="slotsContainer">
          <MDBRow>
            <MDBCol>
              <MDBBtn>get preferable working slots</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn>get vac working slots</MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    </div>
  );
};
export default GenarateRoster;
