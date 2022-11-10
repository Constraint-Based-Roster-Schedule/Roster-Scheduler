import { SecurityOutlined } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import DailyRosterConstraints from "../components/dailyRosterConstraints";
import "../CSS/rosterGenerator.css";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
  MDBInputGroup,
  MDBContainer,
  MDBCol,
  MDBRow
} from "mdb-react-ui-kit";

function RosterGenerator() {
  const [count, setCount] = useState(0);
  const [formValue, setFormValue] = useState({
    fname: "Mark",
    lname: "Otto",
    email: "",
    city: "",
    state: "",
    zip: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
   
    <MDBRow tag="form" className='g-3'>
      <MDBCol md="4">
        <MDBInput
          value={formValue.fname}
          name='fname'
          onChange={onChange}
          id='validationCustom01'
          required
          label='First name'
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
          value={formValue.lname}
          name='lname'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Last name'
        />
      </MDBCol>
      <MDBCol md="4">
        <div className='input-group has-validation'>
          <span className='input-group-text' id='inputGroupPrepend'>
            @
          </span>
          <input
            type='text'
            className='form-control'
            id='validationCustomUsername'
            placeholder='Username'
            required
          />
          <div className='invalid-feedback'>Please choose a username.</div>
        </div>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={formValue.city}
          name='city'
          onChange={onChange}
          id='validationCustom03'
          required
          label='City'
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={formValue.zip}
          name='zip'
          onChange={onChange}
          id='validationCustom05'
          required
          label='Zip'
        />
      </MDBCol>
      <MDBCol size="12">
        <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck2' required />
      </MDBCol>
      <MDBCol size="12">
        <MDBBtn type='submit'>Submit form</MDBBtn>
      </MDBCol>
    </MDBRow>
    
  );
}

export default RosterGenerator;
