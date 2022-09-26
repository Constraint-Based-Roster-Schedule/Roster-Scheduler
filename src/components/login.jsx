import React,{useState} from 'react'
import '../CSS/login.css'
import logo from'../assets/logo.png'
import welcomeimg from '../assets/doctor.png'
// import Footer from './footer.jsx'
function Login () {
    // const handlesubmit-(event)->{
    //     event.preventDefault();
    // }
  return (
    
    <div className="main-login">
       <br></br>
        {/* <link >Register</link> */}
        <div className="login-container">
            <div className="left-side">
                <div className="img-class">
                    <img src={logo} alt="" />
                </div>
                <form >
                    <label for="email">Email</label>
                        <input type="email" placeholder='Enter your email..'id='email' />
                    <label for="password">Password</label>
                        <input type="password" placeholder='Enter password'id='password'/>
                    <button type='submit'>Submit</button>
                </form>
                <div className="footer">
                    <h4>Dont' have an account.. <link  href="" /></h4>
                </div>
            </div>

            <div className="right-side">
                <div className="welcome-note">
                    <h3>........Welcome Back........</h3>
                </div>
                <div className="welcome-img">
                    <img src={welcomeimg} id='wel-img-id'alt="" />
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Login;
