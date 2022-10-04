
import React from 'react'
import Footer from './footer'
import '../CSS/doctorDashboard.css'
import { Link } from 'react-router-dom';
const ConsultantDashboard = () => {
  return (
    <div className='dashboard-container'>
       {/* fffffffffffffffff */}
       <section class='dashboard'>
            <h1>CONSALTANT DASHBOARD</h1>
            <p></p>
            <div class='testimanial-container'>
                <div class="testimanial-col">
                    <Link  to='../consultant/roster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
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
                    <Link  to='../consultant/wardRoster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/ward-roster.webp")} alt=""></img>
                        <div>
                            <p>
                                WARD ROSTER
                            </p>
                            
                        </div>
                    </Link>
                </div>
                
            </div>
            <div class='testimanial-container'>
                                      
                        
                <div class="testimanial-col">
                <Link  to='../consultant/consultantProfile' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    <img src={require("../assets/profile-icon.png")} alt=""></img>
                    <div>
                        <p>
                            PROFILE
                        </p>
                        
                    </div>
                    </Link> 
                </div>
                
                <div class="testimanial-col">
                <Link  to='../consultant/generateRoster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                
                    <img src={require("../assets/doctor.png")} alt=""></img>
                    <div>
                        <p active={true} >
                            GENERATE ROSTER
                        </p>
                       
                    </div>
                    </Link>
                </div>
            </div>
            <div className="testimanial-container">
                <div class="testimanial-col">
                    <Link  to='../consultant/notifications' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/doctor.png")} alt=""></img>
                        <div>
                            <p active={true} >
                                ROSTER NOTIFICATION
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

export default ConsultantDashboard
