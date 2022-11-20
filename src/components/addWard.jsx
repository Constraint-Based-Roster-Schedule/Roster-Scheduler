import React from "react";
import authService from "../auth_service/auth_services";
import wardimg from "../assets/ward.png";
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
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Message } from "@mui/icons-material";
import { margin } from "@mui/system";
import config from '../config.json';
const AddWard = () => {
  const [wardNumber, setWardNumber] = useState();
  const [wardName, setWardName] = useState("");
  const [shiftCount, setShiftCount] = useState();
  const [shiftNames, setShiftNames] = useState([]);
  const [wardNumbers, setWardNumbers] = useState([]);
  const [wardNames, setWardNames] = useState([]);
  const navigate = useNavigate();
  const [isWardNameValidate, setIsWardNameValidate] = useState(true);
  const [nameValidateError, setNameValidateError] = useState("");
  const [isWardIdValidate, setIsWardIdValidate] = useState(true);
  const [idValidateError, setIdValidateError] = useState("");
  const APIEndpoint=config.DOMAIN_NAME+"/user";

  const getWardNames = async (e) => {
    await axios
      .post(APIEndpoint+"/admin/getWardNumbersNames", {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then((res) => {
        console.log(res.data.success);
        if (!res.data.success) {
          console.log("cannot get the details from db");
        } else {
          console.log(res.data.wardNumbers, res.data.wardNames);
          setWardNumbers(res.data.wardNumbers);
          setWardNames(res.data.wardNames);
        }
      });
  };
  const clearForm = (e) => {
    console.log('clear form')
    setWardNumber('');
    setWardName('');
    setShiftNames('');
    setShiftCount('');
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    if (name == "wardNumber") {
      setWardNumber(value);
    } else if (name == "wardName") {
      console.log("change shift cout111111111");
      setWardName(value);
    } else if (name == "shiftCount") {
      console.log("change shift cout");
      setShiftCount(value);
    } else if (name == "shiftNames") {
      setShiftNames(value);
    }
  };
  const validateWardName = (e) => {
    const value = e.target.value;
    console.log(wardNumbers, wardNames);
    if (wardNames.includes(value)) {
      setIsWardNameValidate(false);
      setNameValidateError("Ward Name Already Exists");
      console.log("ward name already exists");
    } else {
      setIsWardNameValidate(true);
      console.log("ward name can be added");
    }
  };

  const validateWardId = (e) => {
    const value = e.target.value;
    console.log(e.target.value, wardNumbers, typeof e.target.value);
    if (wardNumbers.includes(parseInt(value))) {
      setIsWardIdValidate(false);
      setIdValidateError("Ward Id Already Exists");
      console.log("ward Id already exists");
    } else {
      setIsWardIdValidate(true);
      setIdValidateError("Ward Id can be added");
      console.log("ward Id can be added");
    }
  };
  const handleSubmit = async (e) => {
    // e.preventDefault(); //to avoid the refresh the page when submit
    setShiftNames(getShiftNameInput(shiftCount));
    const data = {
      wardNumber: wardNumber,
      wardName: wardName,
      shiftsPerDay: shiftCount,
      shiftNames:getShiftNameInput(shiftCount) ,
      consultantID:NaN,
      doctorCount:0
    };
    console.log(!isWardIdValidate | !isWardNameValidate);
    if(isWardIdValidate && isWardNameValidate){
    await axios
      .post(APIEndpoint+"/user/admin/addWard", data, {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then((res) => {
        alert(res.data.msg);
        console.log(res.data.msg);
        window.location.reload(false);
        
      });}
      else{
        alert('enter valid inputs')
      }

  };

  function getShiftNameInput(number) {
    const fields = [];

    for (let i = 1; i <= number; i++) {
      fields.push('shift '+i);
    }
    console.log(fields)
    return fields;
  }
  const shiftItems = (props) => {
    console.log("rrrr");
    return (
      <MDBRow>
        <MDBCol>
          <MDBInput label={props.value}></MDBInput>
        </MDBCol>
      </MDBRow>
    );
  };

  useState(() => {
    getWardNames();
  });
  return (
    <div>
      <MDBContainer className="py-5" style={{ backgroundColor:'rgb(255, 255, 255)' ,marginBottom:'50px',paddingBottom:'-100px',borderRadius:'10px'}}>
        <MDBRow>
          <h1 className="mb-3">Add ward</h1>
        </MDBRow>
        <MDBRow style={{ alignItems: "flex" }}>
          <MDBCol>
            <img class="img-fluid" src={wardimg} alt="ward img" style={{}} />
          </MDBCol>
          <MDBCol>
            <form
              style={{
                alignItems: "flex",
                display: "block",
                paddingTop: "50px",
              }}
              // onSubmit={handleSubmit}
            >
              <MDBRow></MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    className="mb-3"
                    label="Ward Number  "
                    id="wardNumber"
                    name="wardNumber"
                    type="number"
                    min="1"
                    max="100"
                    onChange={(e) => {
                      handleChange(e);
                      validateWardId(e);
                    }}
                    value={wardNumber}
                    required
                  />
                  {!isWardIdValidate && (
                    <Alert severity="warning">{idValidateError}...</Alert>
                  )}
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    className="mb-3"
                    label="Ward Name"
                    id="wardName"
                    name="wardName"
                    type="text"
                    // onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}}
                    onChange={(e) => {
                      handleChange(e);
                      validateWardName(e);
                    }}
                    value={wardName}
                    required
                  />

                  {!isWardNameValidate && (
                    <Alert severity="warning">{nameValidateError}</Alert>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    className="mb-3"
                    label="Number of Shifts"
                    id="shiftCount"
                    name="shiftCount"
                    min="1"
                    max="5"
                    type="number"
                    onChange={handleChange}
                    value={shiftCount}
                    required
                  />
                </MDBCol>
              </MDBRow>

              {/* <MDBRow>
            <MDBCol> */}
              {/* {getShiftNameInput(3).map((num, index) => (
                <shiftItems key={num.key} value={num.value}></shiftItems>
              ))} */}
              {/* <MDBInput className="mb-3" label="Shift Names" required /> */}
              {/* </MDBCol>
          </MDBRow> */}
              <MDBRow>
                <MDBCol>
                  <MDBCheckbox
                    className="mb-3"
                    type="checkbox"
                    label="Confirm all the conditions"
                    // onChange={handleChange}
                    required
                  />

                  <div class="invalid-feedback">
                    You must confirm before Adding ward.
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ alignItems: "center", display: "flex" }}>
                <MDBCol>
                  <button  class="btn btn-primary" type="button" onClick={handleSubmit}>Add ward</button>
                </MDBCol>
                <MDBCol>
                  <button  class="btn btn-primary" type="submit" onSubmit={clearForm}>
                    Clear form
                  </button>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AddWard;
