import React from 'react'
import Footer from './footer'
import '../CSS/doctorDashboard.css'
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
const DoctorDashboard = () => {
  return (
    <div className='dashboard-container'>
       {/* fffffffffffffffff */}
       <section class='dashboard'>
            <h1>DOCTOR DASHBOARD</h1>
            <p></p>
            <row class='testimanial-container'>
                <div class="testimanial-col">
                    <Link  to='../doctor/roster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/roster-icon.jpg")} alt=""></img>
                        <div>
                            <p>
                                MY ROSTER
                            </p>
                            <h3></h3>
                            <h6></h6>
                        </div>
                    </Link>
                </div>
                       
                <div class="testimanial-col">
                    <Link  to='../doctor/wardRoster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/ward-roster.webp")} alt=""></img>
                        <div>
                            <p>
                                WARD ROSTER
                            </p>
                            
                        </div>
                    </Link>
                </div>
                
            </row>
            <div class='testimanial-container'>
                                      
                        
                <div class="testimanial-col">
                <Link  to='../doctor/doctorProfile' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    <img src={require("../assets/profile-icon.png")} alt=""></img>
                    <div>
                        <p>
                            PROFILE
                        </p>
                        
                    </div>
                    </Link> 
                </div>
                
                <div class="testimanial-col">
                <Link  to='../doctor/shiftRequest' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                
                    <img src={require("../assets/doctor.png")} alt=""></img>
                    <div>
                        <p active={true} >
                            SHIFT REQUEST
                        </p>
                       
                    </div>
                    </Link>
                </div>
            </div>
            <div className="testimanial-container">
                <div class="testimanial-col">
                    <Link  to='../doctor/notifications' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/doctor.png")} alt=""></img>
                        <div>
                            <p active={true} >
                                NOTIFICATION
                            </p>
                        
                        </div>
                        </Link>
                </div>
            </div>
        </section>
        <br />
        <br />
       
    </div>
  )
}

export default DoctorDashboard
