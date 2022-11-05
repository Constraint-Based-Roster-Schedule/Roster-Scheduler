import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../CSS/rosterGenerator.css";
export const GenarateRoster = () => {
  return (
   <>
   <div className='p-2 text-center' style={{marginBottom:'-35px'}} >
        <h1 className='mb-3' >Generate Roster</h1>
       
      </div>
   <div className="form-containner">
    <form action="">
      <row>
      <label htmlFor="">Number of shifts per day</label>
      <input type="number" />
      <label htmlFor="">Number of shifts per day</label>
      <input type="number" />
      </row>
      <label htmlFor="">Number of shifts per day</label>
      <input type="number" />
      <label htmlFor="">Number of shifts per day</label>
      <input type="number" />
      <label htmlFor="">Number of shifts per day</label>
      <input type="number" />
      
    </form>
   </div>
      
      </>
  );
};
export default GenarateRoster;
