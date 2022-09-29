import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function RosterIndividual() {

    const numberOfDays=31;

    function RenderRoster(intRows, intColumns,intStartDate) {
            var rows = [];
            for (var i = 0; i < intRows; i++) {
                var columns = [];
                for (var j = intStartDate-1; j < intColumns+intStartDate-1; j++) {
                    if(i==0 && j>intStartDate-1){
                        columns.push(<Col className='roster-column' sm ><b>{j}</b></Col>);
                    }
                    if(i==1 && j==intStartDate-1){
                        columns.push(<Col className='roster-column' sm={1} ><b>{"Morning shift"}</b></Col>);
                    }
                    if(i==2 && j==intStartDate-1){
                        columns.push(<Col className='roster-column' sm={1} ><b>{"Evening shift"}</b></Col>);
                    }
                    if(i==3 && j==intStartDate-1){
                        columns.push(<Col className='roster-column' sm={1} ><b>{"Night shift"}</b></Col>);
                    }
                    if(i>0 && j>intStartDate-1){
                        columns.push(<Col className='roster-column' ></Col>);
                    }
                    if(i==0 && j==intStartDate-1){
                        columns.push(<Col className='roster-column' sm={1}><b>{"Date"}</b></Col>);
                    }
                    
                }
                rows.push(<Row style={{marginRight:"10px", marginLeft:"10px"}}>{columns}</Row>);
            }
            return rows;
        }

    return (
        <>
            <div className='requestButton' >
                <Link to='/shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
            </div>
            <Carousel>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,16,1)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {numberOfDays==30 ? RenderRoster(4,16,16) : RenderRoster(4,17,16)}
                    </div>
                </Carousel.Item>
            </Carousel> 
        </>    
    )
}

export default RosterIndividual
