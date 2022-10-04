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
const [wardError, setwardError] = useState('');
const [isWardValid,setIsWardValid]=useState(true);

const noOfWards=10;

const handleSubmitConsultant=async(e)=>{
    e.preventDefault();
    const user={"type":userType,"firstName":firstName,"lastName":lastName,"userName":userName,"wardID":"6339b9cc79b089f956978b20","address":address,"emailaddress":email,"telephone":contact,"password":firstName,"speciality":specializedArea};
        await Axios.post("http://localhost:5000/user/admin/addUser", user).then((res) => {
      console.log(res.data);

    //   if (!res.data.success) {
    //     console.log("insideError");
    //     alert(res.data.msg);
    //     // toast.error(res.data.msg,{position:toast.POSITION.TOP_RIGHT});
    //   } else {
    //     localStorage.setItem("user", res.data.token);
    //     let decode = jwtDecode(res.data.token);
    //     // console.log(decode);
    //     if (decode.userType == "1") {
    //         console.log(decode.userType);
    //         navigate("/doctorDashboard");
    //     //   window.location.herf = "../doctorDashboard";
    //     } 
    //     else if (decode.userType =="2") {
    //       console.log(decode.userType);
    //       navigate("/consultantDashboard");
    //     } 
    //     else if (decode.userType == "3") {
    //       console.log(decode.userType);
    //       navigate("/adminDashboard");
    //     }
    //   }
    });
    
}

const handleSubmitDoctor=async(e)=>{
    e.preventDefault();
    const user={"type":userType,"firstName":firstName,"lastName":lastName,"userName":userName,"wardID":"6339b9cc79b089f956978b20","address":address,"emailaddress":email,"telephone":contact,"password":firstName};
        await Axios.post("http://localhost:5000/user/admin/addUser", user).then((res) => {
      console.log(res.data);

    //   if (!res.data.success) {
    //     console.log("insideError");
    //     alert(res.data.msg);
    //     // toast.error(res.data.msg,{position:toast.POSITION.TOP_RIGHT});
    //   } else {
    //     localStorage.setItem("user", res.data.token);
    //     let decode = jwtDecode(res.data.token);
    //     // console.log(decode);
    //     if (decode.userType == "1") {
    //         console.log(decode.userType);
    //         navigate("/doctorDashboard");
    //     //   window.location.herf = "../doctorDashboard";
    //     } 
    //     else if (decode.userType =="2") {
    //       console.log(decode.userType);
    //       navigate("/consultantDashboard");
          
    //     } 
    //     else if (decode.userType == "3") {
    //       console.log(decode.userType);
    //       navigate("/adminDashboard");
    //     }
    //   }
    });
    
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

const validateWard=(e)=>{
    var ward=e.target.value;
    if(isNaN(ward)){
        setIsWardValid(false);
        setwardError('Ward number should be a numeric value');
    }else if((ward>noOfWards || ward<=0) && ward.length>0 ){
        setIsWardValid(false);
        setwardError(`Ward number should be between 0 and ${noOfWards +1}`);
    }else{
        setIsWardValid(true);
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
    setIsWardValid(true);
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
                        <Form.Control type="text" placeholder="Enter first name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicLastName">
                        <Form.Label>Last name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicUserName">
                        <Form.Label>User name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formcontact">
                        <Form.Label>Contact number : </Form.Label>
                        <Form.Control type="text" placeholder="Ex: 0718439534" value={contact}  onChange={(e)=>{setContact(e.target.value); validateContact(e)}}/>
                        {!isContactValid && <Alert severity="warning" >{contactError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicAddress">
                        <Form.Label>Address :</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address}  onChange={(e)=>setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}}/>
                        {!isEmailValid && <Alert severity="warning" >{emailError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter ward number" value={ward} onChange={(e)=>{setWard(e.target.value);validateWard(e)}}/>
                        {!isWardValid && <Alert severity="warning" >{wardError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)}/>
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
                        <Form.Control type="text" placeholder="Enter first name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicLastName">
                        <Form.Label>Last name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicUserName">
                        <Form.Label>User name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formcontact">
                        <Form.Label>Contact number : </Form.Label>
                        <Form.Control type="text" placeholder="Ex: 0718439534" value={contact}  onChange={(e)=>{setContact(e.target.value);validateContact(e)}}/>
                        {!isContactValid && <Alert severity="warning" >{contactError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicAddress">
                        <Form.Label>Address :</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address}  onChange={(e)=>setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}}/>
                        {!isEmailValid && <Alert severity="warning" >{emailError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter ward number" value={ward} onChange={(e)=>{setWard(e.target.value);validateWard(e)}}/>
                        {!isWardValid && <Alert severity="warning" >{wardError}...</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)}/>
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
