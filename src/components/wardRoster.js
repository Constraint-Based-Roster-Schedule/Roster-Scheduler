import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function  WardRoster() {

    const numberOfDays=31;

function RenderRoster(intRows, intColumns,intStartDate) {
        var rows = [];
        for (var i = 0; i < intRows; i++) {
            var columns = [];
            for (var j = intStartDate-1; j < intColumns+intStartDate-1; j++) {
                if(i==0 && j>intStartDate-1){
                    columns.push(<Col sm style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}><b>{j}</b></Col>);
                }
                if(i==1 && j==intStartDate-1){
                    columns.push(<Col sm={1} style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}><b>{"Morning shift"}</b></Col>);
                }
                if(i==2 && j==intStartDate-1){
                    columns.push(<Col sm={1} style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}><b>{"Evening shift"}</b></Col>);
                }
                if(i==3 && j==intStartDate-1){
                    columns.push(<Col sm={1} style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}><b>{"Night shift"}</b></Col>);
                }
                if(i>0 && j>intStartDate-1){
                    columns.push(<Col style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}></Col>);
                }
                if(i==0 && j==intStartDate-1){
                    columns.push(<Col sm={1} style={{backgroundColor:"white", marginBottom:"20px", padding:"25px",marginRight:"5px", display:"flex", justifyContent:"center"}}><b>{"Date"}</b></Col>);
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
                        {RenderRoster(4,8,1)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,8,8)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,8,15)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,8,22)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {numberOfDays==30 ? RenderRoster(4,3,29) : RenderRoster(4,4,29)}
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
        
    )
}

export default WardRoster