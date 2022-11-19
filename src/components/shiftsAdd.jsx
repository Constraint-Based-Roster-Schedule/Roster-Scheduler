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
import { Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ShiftsAdd = () => {
  let [shiftArrayData, setShiftArrayData] = useState([]);
  const [shiftArray, setShiftArray] = useState([]);
  const [numOfShift, setNumOfShifts] = useState(0);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [ssss, setssss] = useState();
  const wardID = authService.getWardID();
  console.log(wardID)
  const d = new Date();
  const navigate = useNavigate();
  const months = [
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
  const [currentMonth, setCurrentMonth] = useState(
    d.getFullYear() + "-" + (d.getMonth() + 2)
  );
  console.log("current month", currentMonth, authService.getWardID());
  const shiftsChange = (e) => {
    console.log(e);
    let value = e;
    console.log(value);
    var arr = [];
    var arr2 = [];
    for (var i = 1; i <= value; i++) {
      arr.push({ key: i, value: i });
      arr2.push([i, {}]);
    }
    console.log(arr, arr2);
    setssss(arr2);
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
      setMonth(months[parseInt(month.substring(5)) - 1]);
      setYear(month.substring(0, 4));
    }
  };
  const getNumberOfShift = () => {
    let data = { wardId: wardID };
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
          2: { 0: { 0: 2, 1: 20 }, 1: { 0: 3, 1: 30 } },
        },
        1: {
          0: "evening shift",
          1: "#68e113",
          2: { 0: { 0: 2, 1: 20 }, 1: { 0: 3, 1: 30 } },
        },
        2: {
          0: "night shift",
          1: "#ef0808",
          2: { 0: { 0: 2, 1: 20 }, 1: { 0: 3, 1: 30 } },
        },
      },
    };
    axios
      .post(
        "http://localhost:5000/user/consultant/addShift",
        {
          month: month,
          wardID: wardID,
          year: year,
          shifts: getShiftDeails(shiftArrayData),
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then((res) => {
        alert(res.data.msg);
        if (res.data.success) {
          window.location.reload(false);
          navigate("../shiftsAdd");
        }
      });

    console.log(shiftArrayData, numOfShift, month);
  };

  const getCurrentMonth = () => {
    const months = [
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

    const d = new Date();
    let month = d.getMonth();
    console.log(month);
    return month;
  };
  const endTimeValidate = () => {};
  const dumyshiftdetails = {
    "1 shift": "dd",
    "1 shift color": "#691c1c",
    "1 shift ending time": "02:39",
    "1 shift starting time": "11:39",
    "2 shift": "ddd",
    "2 shift color": "#b14e4e",
    "2 shift ending time": "12:38",
    "2 shift starting time": "13:38",
    "3 shift": "dss",
    "3 shift color": "#dd2727",
    "3 shift ending time": "15:40",
    "3 shift starting time": "17:40",
  };
  const getShiftDeails = (curentInputs) => {
    let details = [];
    const dumyshiftdetails = curentInputs;
    let li = Object.keys(dumyshiftdetails);
    console.log(Object.keys(dumyshiftdetails));
    for (var i = 0; i < li.length; i = i + 3) {
      var name = li[i];
      var color = li[i + 1];
      console.log("i", i);
      console.log(dumyshiftdetails[li[i + 2]].split(":")[0]);
      var startingTime1 = parseInt(dumyshiftdetails[li[i + 2]].split(":")[0]);
      var startingTime2 = parseInt(dumyshiftdetails[li[i + 2]].split(":")[1]);
      if (i == Object.keys(dumyshiftdetails).length - 3) {
        console.log("yesss");
        var endingTime1 = 23;
        var endingTime2 = 59;
      } else {
        console.log("nooooo", dumyshiftdetails.length);
        var endingTime1 = parseInt(dumyshiftdetails[li[i + 5]].split(":")[0]);
        var endingTime2 = parseInt(dumyshiftdetails[li[i + 5]].split(":")[1]);
      }
      console.log(name);
      let xli = name.split(" ");
      console.log(xli);
      console.log("ddd harshani");
      // details[i / 3] = {
      //   0: dumyshiftdetails[li[i]],
      //   1: dumyshiftdetails[li[i + 1]],
      //   2: {
      //     0: startingTime1,
      //     1: startingTime2,
      //   },
      //   3: {
      //     0: endingTime1,
      //     1: endingTime2,
      //   },
      details.push([dumyshiftdetails[li[i]],dumyshiftdetails[li[i + 1]],[startingTime1,startingTime2],[endingTime1,endingTime2]])
      // };
      // details.(i)={
      //         0:dumyshiftdetails.{name},
      //         1:dumyshiftdetails.color,
      //         2:dumyshiftdetails.startingTime,
      //         3:dumyshiftdetails.endingTime
      //     }
    }
    console.log(details);
    return details;
  };

  return (
    <div className="shiftDetailsContainer" style={{marginTop:"5rem"}}>
      <MDBContainer
        className="py-5"
        style={{ backgroundColor: "rgb(255, 255, 255)", marginTop: "25px" }}
      >
        <MDBRow>
          <h1 className="mb-3">Shift Details of Month</h1>
          {/* <MDBBtn onClick={handleSubmit}>save shifts</MDBBtn> */}
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
                {/* <MDBCol>
                  <MDBInput
                    label="Ending time"
                    type="time"
                    onChange={shiftchange}
                    name={arr.key + " shift ending time"}
                    key={arr.key + " shift ending time"}
                    required
                  ></MDBInput>
                </MDBCol> */}
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
