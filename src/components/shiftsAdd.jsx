import React from "react";
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
import axios from "axios";
import authService from "../auth_service/auth_services";
import { useEffect } from "react";
export const ShiftsAdd = () => {
  let [shiftArrayData, setShiftArrayData] = useState([]);
  const [shiftArray, setShiftArray] = useState([]);
  const [numOfShift, setNumOfShifts] = useState(0);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const d = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    d.getFullYear() + "-" + (d.getMonth() + 2)
  );
  console.log("current month", currentMonth);
  const shiftsChange = (e) => {
    console.log(e);
    let value = e;
    console.log(value);
    var arr = [];
    for (var i = 1; i <= value; i++) {
      arr.push({ key: i, value: i });
    }
    console.log(arr);
    setShiftArray(arr);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    console.log(typeof value);
    if (name == "month") {
      let month = e.target.value;
      console.log(typeof value);
      setMonth(month.substring(5));
      setYear(month.substring(0, 4));
    }
  };
  const getNumberOfShift = () => {
    let data = { wardId: "6370d5691d751c5aeb235fb1" };
    axios
      .post("http://localhost:5000/user/consultant/getShiftCount", data, {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.success) {
          console.log("no founded shift count");
        } else {
          console.log("shift count", res.data.shiftCountOfWard);
          setNumOfShifts(res.data.shiftCountOfWard);
          shiftsChange(res.data.shiftCountOfWard);
        }
      });
  };
  const shiftchange = (e) => {
    console.log(e.target.value, e.target.name);
    console.log(typeof e.target.value);
    setShiftArrayData(
      (shiftArrayData = {
        ...shiftArrayData,
        [e.target.name]: e.target.value,
      })
    );
    console.log(shiftArrayData);
  };

  useState(() => {
    console.log("getting shift count per day");
    getNumberOfShift();
    // handleChange();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const detailse = {
      month: "november",
      year: "2022",
      wardID: 12,
      shifts: {
        0: {
          0: "morning shift",
          1: "#eeeeee",
          2: {
            0: {
              0: 2,
              1: 20,
            },
            1: {
              0: 3,
              1: 30,
            },
          },
        },
        1: {
          0: "evening shift",
          1: "#68e113",
          2: {
            0: {
              0: 2,
              1: 20,
            },
            1: {
              0: 3,
              1: 30,
            },
          },
        },
        2: {
          0: "night shift",
          1: "#ef0808",
          2: {
            0: {
              0: 2,
              1: 20,
            },
            1: {
              0: 3,
              1: 30,
            },
          },
        },
      },
    };
    axios
      .post("http://localhost:5000/user/consultant/addShift", {month:month,year:year,wardID:12,shiftData:shiftArrayData}, {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then((res) => {});

    console.log(shiftArrayData, numOfShift, month);
  };

  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let month = d.getMonth();
    console.log(month);
    return month;
  };
  const endTimeValidate = () => {};
  const dumyshiftdetails = [
    {
      "1 shift": "dd",
      "1 shift color": "#691c1c",
      "1 shift ending time": "02:39",
      "1 shift starting time": "11:39",
      "2 shift": "ddd",
      "2 shift color": "#b14e4e",
      "2 shift ending time": "01:38",
      "2 shift starting time": "11:38",
      "3 shift": "dss",
      "3 shift color": "#dd2727",
      "3 shift ending time": "02:40",
      "3 shift starting time": "03:40",
    },
  ];

  let details={}
  for(var i=1;i<5;i++){
    console.log(dumyshiftdetails)
  }
  return (
    <div className="shiftDetailsContainer">
      <MDBContainer
        className="py-5"
        style={{ backgroundColor: "rgb(255, 255, 255)", marginTop: "5px" }}
      >
        <MDBRow>
          <h1 className="mb-3">Shift Details of Month</h1>
          <MDBBtn onClick={handleSubmit}>save shifts</MDBBtn>
        </MDBRow>
        <form onSubmit={handleSubmit} method="post">
          <MDBRow>
            <MDBCol>
              <MDBInput
                type="number"
                label="shift count per day"
                required
                className="mb-3"
                min="1"
                name="numOfShift"
                value={numOfShift}
                // onChange={handleChange}
                readOnly
              ></MDBInput>
            </MDBCol>

            <MDBCol>
              <MDBInput
                type="month"
                label="select month"
                required
                className="mb-3"
                name="month"
                // min={currentMonth}
                onChange={handleChange}
              ></MDBInput>
            </MDBCol>
          </MDBRow>

          {/* add the sift names and colores  */}
          <MDBRow>
            {shiftArray.map((arr, index) => (
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label={"shift " + arr.value}
                    key={arr.key + " shift"}
                    type="text"
                    name={arr.key + " shift"}
                    onChange={shiftchange}
                    required
                  ></MDBInput>
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label={arr.key + " shift color"}
                    key={arr.key + " shift color"}
                    type="color"
                    name={arr.key + " shift color"}
                    onChange={shiftchange}
                    style={{
                      display: "block",
                      height: "38px",
                    }}
                    required
                  ></MDBInput>
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label="starting time"
                    type="time"
                    runat="server"
                    name={arr.key + " shift starting time"}
                    key={arr.key + " shift starting time"}
                    onChange={shiftchange}
                    required
                  ></MDBInput>
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label="Ending time"
                    type="time"
                    onChange={shiftchange}
                    name={arr.key + " shift ending time"}
                    key={arr.key + " shift ending time"}
                    required
                  ></MDBInput>
                </MDBCol>
              </MDBRow>
            ))}
          </MDBRow>
          <MDBRow>
            <MDBBtn type="submit">add shift</MDBBtn>
          </MDBRow>
        </form>
      </MDBContainer>
    </div>
  );
};
export default ShiftsAdd;
