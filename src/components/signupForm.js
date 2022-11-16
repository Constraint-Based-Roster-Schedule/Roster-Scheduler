import React, { useState, useEffect, useRef } from 'react';
import '../CSS/signupForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import signup from '../services/API/authSignup';
import {FaUserCircle} from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { ConstructionOutlined } from '@mui/icons-material';
import Axios from "axios";
import authService from "../auth_service/auth_services";

function SignupForm() {
const [userType,setUserType]=useState('');
const [firstName,setFirstName]=useState('');
const [lastName,setLastName]=useState('');
const [userName,setUserName]=useState('');
const [contact,setContact]=useState('');
const [address,setAddress]=useState('');
const [email,setEmail]=useState('');
const [ward,setWard]=useState('');
const [specializedArea,setSpecializedArea]=useState('');

const [emailError, setEmailError] = useState('');
const [isEmailValid,setIsEmailValid]=useState(true);
const [contactError, setContactError] = useState('');
const [isContactValid,setIsContactValid]=useState(true);


const [wards,setWards]=useState("")

const noOfWards=10;

useEffect(()=>{
    fetchAvailableWards();
},[])

const fetchAvailableWards=async()=>{
    await Axios.get("http://localhost:5000/user/admin/getAvailableWards").then((res) => {
        //console.log(res.data.availableWards);
        setWards(res.data.availableWards);
        //console.log(wards)
    })
}

const handleSubmitConsultant=async(e)=>{
    e.preventDefault();
    const user={"type":userType,"firstName":firstName,"lastName":lastName,"userName":userName,"wardID":ward,"address":address,"emailaddress":email,"telephone":contact,"password":firstName,"speciality":specializedArea};
        await Axios.post("http://localhost:5000/user/admin/addUser", user).then((res) => {
      console.log(res.data);
    });
    handleReset();
}

const handleSubmitDoctor=async(e)=>{
    e.preventDefault();
    const user={"type":userType,"firstName":firstName,"lastName":lastName,"userName":userName,"wardID":ward,"address":address,"emailaddress":email,"telephone":contact,"password":firstName};
        await Axios.post("http://localhost:5000/user/admin/addUser", user).then((res) => {
      console.log(res.data);

    });
    handleReset();
}


const validateEmail=(e)=>{
    var email = e.target.value;
    if (!validator.isEmail(email) && email.length>0) {
        setIsEmailValid(false);
        setEmailError('Enter a Valid Email')
    } else{
        setIsEmailValid(true);
    }
}

const validateContact=(e)=>{
    var contact=e.target.value;
    if(isNaN(contact)){
        setIsContactValid(false);
        setContactError('Contact number can only have numeric characters')
    }else if(contact[0]!=='0' && contact.length>0){
        setIsContactValid(false);
        setContactError('Contact number should start with 0')
    }else if(contact.length>10){
        setIsContactValid(false);
        setContactError('Number of chracters in the contact number should not exceed 10')
    }else{
        setIsContactValid(true);
    }
}


const handleReset=()=>{
    setFirstName('');
    setLastName('');
    setUserName('');
    setContact('');
    setAddress('')
    setEmail('');
    setWard('');
    setSpecializedArea('');
    setIsEmailValid(true);
    setIsContactValid(true);

}


return (
    <>
        <div className='container col-lg d-flex flex-column'>
            <h1 className='font-monospace mb-4' style={{textAlign:"center"}}>Add User</h1>
            <div className='userSelector col-lg' style={{backgroundColor:'rgb(230, 230, 230)', borderRadius:"7px"}}>
                <form>
                    <div className="form-group col-lg-6 container d-flex flex-row my-3">
                        <label htmlFor="userType" className="col-lg-6" style={{fontSize:"20px"}}><b>Select the user type:</b></label>
                        <select className="form-select col-lg-2" id='userType' aria-label="Default select example" value={userType} onChange={(e)=>{setUserType(e.target.value); setIsEmailValid(true);handleReset();}}>
                            <option value={"Default"} key={0}>Choose a user type</option>
                            <option value={"1"} key={1}>Doctor</option>
                            <option value={"2"} key={2}>Consultant</option>
                        </select>
                    </div>                   
                </form>
            </div>
            {userType==='1' && (
            <div className='form d-flex justify-content col-lg' style={{backgroundColor:'rgb(230, 230, 230)', borderRadius:"7px"}}>                
                <FaUserCircle className='addUserIcon' size={100}/>                
                <h2 className='register-topic'>Registration form of a doctor</h2>
                <form onSubmit={handleSubmitDoctor}>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicFirstName">
                        <Form.Label>First name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicLastName">
                        <Form.Label>Last name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lastName}  onChange={(e)=>setLastName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicUserName">
                        <Form.Label>User name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={userName}  onChange={(e)=>setUserName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formcontact">
                        <Form.Label>Contact number : </Form.Label>
                        <Form.Control type="text" placeholder="Ex: 0718439534" value={contact}  onChange={(e)=>{setContact(e.target.value); validateContact(e)}} required/>
                        {!isContactValid && <Alert severity="warning" >{contactError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicAddress">
                        <Form.Label>Address :</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address}  onChange={(e)=>setAddress(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}} required/>
                        {!isEmailValid && <Alert severity="warning" >{emailError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Select className='formSelect' type="text" value={ward} onChange={(e)=>setWard(e.target.value)} required>
                            {wards.map((ward)=>{
                                return <option value={ward}>{ward}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)} required/>
                    </Form.Group>
                    <div className='d-flex flex-row justify-content-center col-lg-10'>
                        <Button className='sub-btn' variant="primary" type="submit"  >
                        Submit
                        </Button>
                        <Button className='reset-btn' variant="primary" type="button" onClick={handleReset}>
                        Reset
                        </Button>
                    </div>
                    
                </form>
            </div>)}

            {userType==='2' && (
            <div className='form d-flex justify-content' style={{backgroundColor:'rgb(230, 230, 230)'}}>
                <FaUserCircle className='addUserIcon' size={100}/>
                <h2 className='m-auto'>Registration form of a consultant</h2>
                <form onSubmit={handleSubmitConsultant}>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicFirstName">
                        <Form.Label>First name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicLastName">
                        <Form.Label>Last name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lastName}  onChange={(e)=>setLastName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicUserName">
                        <Form.Label>User name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={userName}  onChange={(e)=>setUserName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formcontact">
                        <Form.Label>Contact number : </Form.Label>
                        <Form.Control type="text" placeholder="Ex: 0718439534" value={contact}  onChange={(e)=>{setContact(e.target.value);validateContact(e)}} required/>
                        {!isContactValid && <Alert severity="warning" >{contactError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicAddress">
                        <Form.Label>Address :</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address}  onChange={(e)=>setAddress(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}} required/>
                        {!isEmailValid && <Alert severity="warning" >{emailError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Select className='formSelect' type="text" value={ward} onChange={(e)=>setWard(e.target.value)} required>
                            {wards.map((ward)=>{
                                return <option value={ward}>{ward}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)} required/>
                    </Form.Group>
                    <div className='d-flex flex-row justify-content-center'>
                        <Button className='sub-btn' variant="primary" type="submit"  >
                        Submit
                        </Button>
                        <Button className='reset-btn' variant="primary" type="button"  onClick={handleReset}>
                        Reset
                        </Button>
                    </div>
                    
                </form>
            </div>)}
            
        </div>
    </>
)
}

export default SignupForm
