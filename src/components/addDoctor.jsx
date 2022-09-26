import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,MDBContainer ,
  MDBBtn
} from 'mdb-react-ui-kit';

function AddDoctor() {
  return (
    <div style={{background:"#2EC4F3"}}>
        <MDBRow start>
        
            <MDBCol size='10' style={{background:"#2EC4F3"}}>
                <br /><br />
                <h4>Add doctor</h4><br />
            </MDBCol>
        </MDBRow>
    <MDBContainer className="py-5" style={{background:"#D9D9D9",marginTop:'0',width:'50%',borderRadius:'15px'}}>
        <MDBRow start>
        <form>
        <MDBRow className='mb-6'style={{}}>
            <MDBCol>
            <MDBInput id='FirstNmae' label='First name' placeholder='Enter first name'/>
            </MDBCol>
            <MDBCol>
            <MDBInput id='LastName' label='Last name' placeholder='Enter first name'/>
            </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-2' id='form6Example3' label='Ward numbers' placeholder='Enter first name'/>
        <MDBInput wrapperClass='mb-2' id='form6Example4' label='Address' placeholder='Enter first name'/>
        <MDBInput wrapperClass='mb-2' type='email' id='form6Example5' label='Email' placeholder='Enter first name'/>
        <MDBInput wrapperClass='mb-2' type='tel' id='form6Example6' label='Phone'placeholder='Enter first name' />
        <MDBInput wrapperClass='mb-2' type='email' id='form6Example5' label='Email' placeholder='Enter first name'/>
        <MDBInput wrapperClass='mb-2' type='tel' id='form6Example6' label='Phone'placeholder='Enter first name' />

        <MDBInput wrapperClass='mb-2' textarea id='form6Example7' rows={4} label='Additional information' />

        <MDBCheckbox
            wrapperClass='d-flex justify-content-center mb-4'
            id='form6Example8'
            label='Create an account?'
            defaultChecked
        />

        <MDBBtn className='mb-4' type='info' block style={{background:'#2bd1ce'}}>
            Add account
        </MDBBtn>
        </form></MDBRow>
    </MDBContainer ></div>
  );
}
export default AddDoctor;