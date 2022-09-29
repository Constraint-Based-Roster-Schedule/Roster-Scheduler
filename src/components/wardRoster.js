import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import '../CSS/wardRoster.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function  WardRoster() {
    const [windowSize,setWindowSize]=useState(getWindowSize());
    const [slotGap,setSlotGap]=useState(null);
    const numberOfDays=31;

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            console.log(windowSize);
            if(windowSize>1100){
                setSlotGap(7);
            }
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    

    function RenderRoster(intRows, intColumns,intStartDate) {
        var rows = [];
        for (var i = 0; i < intRows; i++) {
            var columns = [];
            for (var j = intStartDate-1; j < intColumns+intStartDate-1; j++) {
                if(i==0 && j>intStartDate-1){
                    columns.push(<Col className='ward-roster-column'  ><b>{j}</b></Col>);
                }
                if(i==1 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Morning shift"}</b></Col>);
                }
                if(i==2 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Evening shift"}</b></Col>);
                }
                if(i==3 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Night shift"}</b></Col>);
                }
                if(i>0 && j>intStartDate-1){
                    columns.push(<Col  className='ward-roster-column'></Col>);
                }
                if(i==0 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags'><b>{"Date"}</b></Col>);
                }
                
            }
            rows.push(<Row style={{marginRight:"10px", marginLeft:"10px"}}>{columns}</Row>);
        }
        return rows;
    }

    function RenderRoster(intRows, intColumns,intStartDate) {
        var rows = [];
        for (var i = 0; i < intRows; i++) {
            var columns = [];
            for (var j = intStartDate-1; j < intColumns+intStartDate-1; j++) {
                if(i==0 && j>intStartDate-1){
                    columns.push(<Col className='ward-roster-column'  ><b>{j}</b></Col>);
                }
                if(i==1 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Morning shift"}</b></Col>);
                }
                if(i==2 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Evening shift"}</b></Col>);
                }
                if(i==3 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags' ><b>{"Night shift"}</b></Col>);
                }
                if(i>0 && j>intStartDate-1){
                    columns.push(<Col  className='ward-roster-column'></Col>);
                }
                if(i==0 && j==intStartDate-1){
                    columns.push(<Col className='ward-roster-column' id='naming-tags'><b>{"Date"}</b></Col>);
                }
                
            }
            rows.push(<Row style={{marginRight:"10px", marginLeft:"10px"}}>{columns}</Row>);
        }
        return rows;
    }

    function renderCoursalItems(){
        const quotient = Math.floor(numberOfDays/slotGap);
        const remainder = numberOfDays % slotGap;
        var itemNumbers=quotient;
        var items=[]
        for(var i=0;i<itemNumbers;i++){
            items.push(
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,slotGap+1,1+i*slotGap)}
                    </div>
                </Carousel.Item>)
        }
        items.push(
            <Carousel.Item>
                <div className='rosterContainer'>
                    {RenderRoster(4,slotGap+1,slotGap*quotient+1)}
                </div>
            </Carousel.Item>
        )
        return items;
    }
    
    return (
        <>
            <div className='requestButton' >
                <Link to='/shiftRequest'><Button variant="primary" style={{backgroundColor:"rgb(205, 37, 33)" }}>Request Shift Exchange</Button></Link>             
            </div>
            {windowSize.innerWidth>1100 && 
            (<Carousel>
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
            </Carousel>)}

            {windowSize.innerWidth<=1100 && windowSize.innerWidth>700 &&
            (<Carousel>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,1)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,6)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,11)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,16)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,21)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,6,26)}
                    </div>
                </Carousel.Item>
                
            </Carousel>)}

            {windowSize.innerWidth<700 && windowSize.innerWidth>=400 &&
            (<Carousel>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,1)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,4)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,7)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,10)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,13)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,16)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,19)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,22)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,25)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,4,28)}
                    </div>
                </Carousel.Item>
                
            </Carousel>)}

            {windowSize.innerWidth<400 && windowSize.innerWidth>=300 &&
            (<Carousel>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,1)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,3)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,5)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,7)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,9)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,11)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,13)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,15)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,17)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,19)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,21)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,23)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,25)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,27)}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='rosterContainer'>
                        {RenderRoster(4,3,29)}
                    </div>
                </Carousel.Item>
            </Carousel>)}
        </>
        
    )
}

export default WardRoster
