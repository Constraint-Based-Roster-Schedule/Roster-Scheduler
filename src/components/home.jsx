import React from "react";
import "../CSS/homepage.css";
import homeimg from '../assets/home-orginal.jpg'
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className="main-home">
      <br></br>
      
      <div className="home-container">
      {/* <div className="login-container2"> */}
        <div className="left-side_">
         <h1>Roster Care</h1>
         <div className="line-des">
          <p> Digitize your </p>
          <p>medical routine...</p>
           
         </div>
         <div className="roster-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores numquam ipsa quia impedit. Deleniti magni necessitatibus obcaecati quo voluptatem quae, voluptate ipsam fuga dolore iste repudiandae facilis soluta cupiditate eos.
         </div>
         <div className="button-container1">
          <button><Link to='/about'>View More</Link></button>
         </div>
        </div>
        <div className="right-side_">
          <img src={homeimg} alt="" srcset="" />
          
        </div>
          
          
        </div>
    </div>
     
    
  );
};

export default HomePage;
