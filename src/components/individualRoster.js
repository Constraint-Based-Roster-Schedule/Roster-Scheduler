import React, { useState , useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/roster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import {BsCheckLg} from 'react-icons/bs';


function IndividualRoster(properties) {
  const [windowSize,setWindowSize]=useState(getWindowSize());
  const shifts=properties.myShifts;

  useEffect(() => {
    function handleWindowResize() {
        setWindowSize(getWindowSize());
        //console.log(shifts['1']);
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
            columns.push(<Col className='roster-column'><b>{j}</b></Col>);
          }
          if(i==1 && j==intStartDate-1){
            columns.push(<Col className='roster-column' ><b>{"Morning shift"}</b></Col>);
          }
          if(i==2 && j==intStartDate-1){
            columns.push(<Col className='roster-column'><b>{"Evening shift"}</b></Col>);
          }
          if(i==3 && j==intStartDate-1){
            columns.push(<Col className='roster-column'><b>{"Night shift"}</b></Col>);
          }
          if(i>0 && j>intStartDate-1){
            if((shifts[j])[i-1]==1){
                columns.push(<Col className='roster-column' style={{backgroundColor:"rgb(147, 224, 94)"}} ></Col>);
            }else{
                columns.push(<Col className='roster-column' ><b></b></Col>);
            }
            
          }
          if(i==0 && j==intStartDate-1){
            columns.push(<Col className='roster-column'><b>{"Date"}</b></Col>);
          }
            
        }
        rows.push(<Row style={{marginRight:"10px", marginLeft:"10px"}}>{columns}</Row>);
    }
    return rows;
  }

  return (
    <>
      { windowSize.innerWidth>=1400 && (
      <Carousel>
          <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,16,1)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='rosterContainer'>
                  {properties.numberOfDays==30 ? RenderRoster(4,16,16) : RenderRoster(4,17,16)}
              </div>
          </Carousel.Item>
      </Carousel> )}
      
      { windowSize.innerWidth<1400  && windowSize.innerWidth>1050 && (
      <Carousel>
          <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,11,1)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,11,11)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,11,21)}
              </div>
          </Carousel.Item>
          {properties.numberOfDays===31 && <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,2,31)}
              </div>
          </Carousel.Item>}
      </Carousel> )}

      { windowSize.innerWidth<=1050  && windowSize.innerWidth>400 && (
      <Carousel>
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
          {properties.numberOfDays===31 && <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,2,31)}
              </div>
          </Carousel.Item>}
      </Carousel> )}

      {windowSize.innerWidth<400 && windowSize.innerWidth>=300 &&
      (<Carousel>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,1)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,3)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,5)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,7)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,9)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,11)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,13)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,15)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,17)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,19)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,21)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,23)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,25)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,27)}
              </div>
          </Carousel.Item>
          <Carousel.Item>
              <div className='ward-rosterContainer'>
                  {RenderRoster(4,3,29)}
              </div>
          </Carousel.Item>
          {properties.numberOfDays===31 && <Carousel.Item>
              <div className='rosterContainer'>
                  {RenderRoster(4,2,31)}
              </div>
          </Carousel.Item>}
      </Carousel>)}    
    </>
  )
}

export default IndividualRoster