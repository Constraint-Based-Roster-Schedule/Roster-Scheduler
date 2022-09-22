import React, { useState, useEffect, useRef } from 'react';
import '../CSS/signupForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validator from 'validator'

function SignupForm() {
const [userType,setUserType]=useState('');
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [ward,setWard]=useState('');
const [specializedArea,setSpecializedArea]=useState('');

const [emailError, setEmailError] = useState('')
const [isEmailValid,setIsEmailValid]=useState(true)

const handleSubmit=(e)=>{
    e.preventDefault();
    const user={"type":userType,"name":name,"email":email,"ward":ward,"specializedArea":specializedArea};
    console.log(user);
}

const validateEmail=(e)=>{
    var email = e.target.value
  
    if (!validator.isEmail(email)) {
        setIsEmailValid(false);
        setEmailError('Enter a Valid Email')
    } else{
        setIsEmailValid(true);
    }
}

const handleReset=()=>{
    setName('');
    setEmail('');
    setWard('');
    setSpecializedArea('');
    setIsEmailValid(true);
}


return (
    <>
        <div className='container col-lg d-flex flex-column'>
            <div className='userSelector col-lg' style={{backgroundColor:'white', borderRadius:"7px"}}>
                <form>
                    <div className="form-group col-lg-6 container d-flex flex-row my-3">
                        <label htmlFor="userType" className="col-lg-6" style={{fontSize:"20px"}}><b>Select the user type:</b></label>
                        <select className="form-select col-lg-2" id='userType' aria-label="Default select example" value={userType} onChange={(e)=>{setUserType(e.target.value); setIsEmailValid(true);handleReset();}}>
                            <option value={"Default"} key={0}>Choose a user type</option>
                            <option value={"Doctor"} key={1}>Doctor</option>
                            <option value={"Consultant"} key={2}>Consultant</option>
                        </select>
                    </div>                   
                </form>
            </div>
            {userType==='Doctor' && (
            <div className='form d-flex justify-content col-lg' style={{backgroundColor:'white', borderRadius:"7px"}}>
                <h2 className='m-auto'>Registration form of a doctor</h2>
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 col-lg-8 " controlId="formBasicFullName">
                        <Form.Label>Full name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name}  onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value); validateEmail(e)}}/>
                        {!isEmailValid && <span style={{fontWeight: 'bold',color: 'red',}}>{emailError}...</span>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-3" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter ward number" value={ward} onChange={(e)=>setWard(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)}/>
                    </Form.Group>
                    <div className='d-flex flex-row justify-content-center col-lg-10'>
                        <Button variant="primary" type="submit" style={{ width:"120px", marginRight:"10rem"}} >
                        Submit
                        </Button>
                        <Button variant="primary" type="button" style={{width:"120px"}} onClick={handleReset}>
                        Reset
                        </Button>
                    </div>
                    
                </form>
            </div>)}

            {userType==='Consultant' && (
            <div className='form d-flex justify-content' style={{backgroundColor:'white'}}>
                <h2 className='m-auto'>Registration form of a consultant</h2>
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 " controlId="formBasicFullName">
                        <Form.Label>Full name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name}  onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);validateEmail(e)}}/>
                        {!isEmailValid && <span style={{fontWeight: 'bold',color: 'red',}}>{emailError}...</span>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-3" controlId="formBasicWard">
                        <Form.Label>Ward number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter ward number" value={ward} onChange={(e)=>setWard(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="formBasicSpeciality">
                        <Form.Label>Speciality :</Form.Label>
                        <Form.Control type="text" placeholder="Enter speciality of the doctor" value={specializedArea} onChange={(e)=>setSpecializedArea(e.target.value)}/>
                    </Form.Group>
                    <div className='d-flex flex-row justify-content-center'>
                        <Button variant="primary" type="submit" style={{marginRight:"300px" , width:"120px"}} >
                        Submit
                        </Button>
                        <Button variant="primary" type="button" style={{width:"120px"}} onClick={handleReset}>
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
