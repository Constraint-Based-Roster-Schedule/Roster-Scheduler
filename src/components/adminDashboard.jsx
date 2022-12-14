import React from 'react'
import Footer from './footer'
import '../CSS/doctorDashboard.css'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  return (
    <div className='dashboard-container'>
       {/* fffffffffffffffff */}
       <section class='dashboard'>
            <h1>ADMIN DASHBOARD</h1>
            <p></p>
            <div class='testimanial-container'>
            <div class="testimanial-col">
                <Link  to='../admin/addWard' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                    <img src={require("../assets/doctor.png")} alt=""></img>
                    <div>
                        <p active={true} >
                            Add Ward
                        </p>
                    
                    </div>
                    </Link>
                </div>
                       
                <div class="testimanial-col">
                    <Link  to='../admin/searchWardRoster' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
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
                <Link  to='../admin/adminProfile' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    <img src={require("../assets/profile-icon.png")} alt=""></img>
                    <div>
                        <p>
                            MY PROFILE
                        </p>
                        
                    </div>
                    </Link> 
                </div>
                
                <div class="testimanial-col">
                <Link  to='../admin/signupForm' style={{textDecoration:"none", alignItems:'center',marginLeft:"20px" ,}}>
                    
                        <img src={require("../assets/doctor.png")} alt=""></img>
                        <div>
                            <p active={true} >
                                ADD USER
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
