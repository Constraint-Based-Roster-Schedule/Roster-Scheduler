import React, { useState } from 'react';
import {TbExchange} from 'react-icons/tb';
import {MdNotifications} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import '../CSS/notifications.css';
import { Link } from 'react-router-dom';



function Notifications() {
  const [recNotifications,setRecNotifications]=useState([{"id":1,"date":2, "workingslot":1,"datewith":4,"shiftwith":2,"doctorID":1,"checked":false},{"id":2,"date":6, "workingslot":1,"datewith":10,"shiftwith":3,"doctorID":9,"checked":false}]);
  const [sentNotifications,setSentNotifications]=useState([{"id":1,"date":1, "workingslot":1,"datewith":4,"shiftwith":2,"doctorID":1,"state":true,"checked":false},{"id":2,"date":2, "workingslot":1,"datewith":10,"shiftwith":3,"doctorID":9,"state":false,"checked":false},{"id":3,"date":3, "workingslot":1,"datewith":4,"shiftwith":2,"doctorID":1,"state":true,"checked":false},{"id":4,"date":4, "workingslot":1,"datewith":4,"shiftwith":2,"doctorID":1,"state":true,"checked":false},{"id":5,"date":5, "workingslot":1,"datewith":4,"shiftwith":2,"doctorID":1,"state":true,"checked":false}]);
  const doctorName="Thinira Genuka";
  const recNotifyNum=recNotifications.length;
  const sentNotifyNum=sentNotifications.length;

  const [showReceivedReq, setShowReceivedReq]=useState(true);
  const [showSentReq,setShowSentReq]=useState(false);

  function closeRecNotify(i){
    setRecNotifications(current =>
      current.filter(notification => {
        return notification.id !== i;
      }),
    );
  } 

  function closeSentNotify(i){
    setSentNotifications(current =>
      current.filter(notification => {
        return notification.id !== i;
      }),
    );
  } 

  return (
    <div className='container col-lg-12'>
      <div className='col-lg'>
        <Button variant='primary' type='button' style={{marginRight:"3rem" ,width:"15rem"}} onClick={()=>{setShowReceivedReq(true); setShowSentReq(false)}}>Requests Received <Badge bg= {recNotifyNum>0 ? "danger" : "secondary"} pill='true' style={{size:"3rem",marginLeft:"1rem"}}>{recNotifyNum}</Badge></Button>
        <Button variant='primary' style={{marginLeft:"3rem", marginRight:"3rem" , width:"15rem" }} onClick={()=>{setShowReceivedReq(false); setShowSentReq(true)}}>Requests Sent <Badge bg={sentNotifyNum>0 ? "danger" : "secondary"} pill='true' style={{marginLeft:"1rem"}}>{sentNotifyNum}</Badge></Button>
      </div>
      <div className='d-flex flex-column justify-content-center p-5' >
        {showReceivedReq && recNotifications.map((notification)=>{
          return <span className='d-flex flex-row mt-5 px-5 pb-1 pt-3' style={{backgroundColor:"rgb(28, 81, 254)", borderRadius:"1rem"}}>
          <p className='notify-text'>You have a request from <b>Dr. {doctorName}</b>  to exchange the working slot <b>{notification.workingslot}</b> on <b>{notification.date}nd of March
          </b> to working slot <b>{notification.shiftwith}</b> on <b>{notification.datewith}th of March</b></p>
          <Button variant='success' type='button' style={{height:"2.5rem",marginRight:"1rem"}} onClick={()=>closeRecNotify(notification.id)}>Accept</Button>
          <Button variant='danger' type='button' style={{height:"2.5rem"}} onClick={()=>closeRecNotify(notification.id)}>Decline</Button>
        </span>
        })}


        {showSentReq && sentNotifications.map((notification)=>{ 
        return <span className='d-flex flex-row mt-5 px-5 pb-3 pt-3' style={{backgroundColor:"rgb(28, 81, 254)", borderRadius:"1rem"}}>
          <p className='notify-text'>Your request to <b>Dr. {doctorName}</b>  for exchange the working slot <b>{notification.workingslot}</b> on <b>{notification.date}nd of March
          </b> to working slot <b>{notification.shiftwith}</b> on <b>{notification.datewith}th of March </b> has been {notification.state ? <b>accepted</b> : <b>declined</b>}</p>
          {!notification.state && <Link to='/shiftRequest'><Button variant='success' type='button' style={{height:"2.5rem",marginRight:"1rem", width:"12rem"}}>Request again</Button></Link>}
          <Button variant='outline-success' style={{height:"2.5rem", borderRadius:"10rem", padding:"5px"}}  onClick={()=>closeSentNotify(notification.id)}><GiCheckMark size={25} style={{color:"rgb(1, 219, 0)"}}/></Button>
        </span>
        })}
      </div>  
    </div>
  )
}

export default Notifications
          