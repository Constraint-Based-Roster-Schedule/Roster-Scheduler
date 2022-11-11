import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WardRosterComponent from '../components/wardRosterComponent';



function  WardRoster() {


    return (
        <>
            <div className='ward-requestButton-filter' >
                
                <Link className='ward-requestButton' to='../shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
            </div>
            <WardRosterComponent />
        </>
        
    )
}

export default WardRoster
