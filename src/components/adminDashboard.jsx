import React from 'react'
import Footer from './footer'
import '../CSS/doctorDashboard.css'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  return (
    <div className='dashboard-container'>
       {/* fffffffffffffffff */}
       <section class='dashboard'>
            <h1>DASHBOARD</h1>
            <p></p>
            <div class='testimanial-container'>
                <div class="testimanial-col">
                    <Link  to='../roster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/roster-icon.jpg")} alt=""></img>
                        <div>
                            <p>
                                ADD CONSTRAINTS
                            </p>
                            <h3></h3>
                            <h6></h6>
                        </div>
                    </Link>
                </div>
                       
                <div class="testimanial-col">
                    <Link  to='../wardRoster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/ward-roster.webp")} alt=""></img>
                        <div>
                            <p>
                                WARD ROSTERS
                            </p>
                            
                        </div>
                    </Link>
                </div>
                
            </div>
            <div class='testimanial-container'>
                                      
                        
                <div class="testimanial-col">
                <Link  to='../doctorProfile' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    <img src={require("../assets/profile-icon.png")} alt=""></img>
                    <div>
                        <p>
                            MY PROFILE
                        </p>
                        
                    </div>
                    </Link> 
                </div>
                
                <div class="testimanial-col">
                <Link  to='../shiftRequest' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                
                    <img src={require("../assets/doctor.png")} alt=""></img>
                    <div>
                        <p active={true} >
                            ROSTER APPROVEL NOTIFICATIONS
                        </p>
                       
                    </div>
                    </Link>
                </div>
            </div>
            <div className="testimanial-container">
                <div class="testimanial-col">
                    <Link  to='../notifications' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
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

export default AdminDashboard
