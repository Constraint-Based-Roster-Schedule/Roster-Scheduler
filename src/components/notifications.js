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
      <div className='btn-container col-lg-10'>
        <Button className='requestReceived-btn' variant='primary' type='button'  onClick={()=>{setShowReceivedReq(true); setShowSentReq(false)}}>Requests Received <Badge bg= {recNotifyNum>0 ? "danger" : "secondary"} pill='true' style={{size:"3rem",marginLeft:"1rem"}}>{recNotifyNum}</Badge></Button>
        <Button className='requestSent-btn' variant='primary' onClick={()=>{setShowReceivedReq(false); setShowSentReq(true)}}>Requests Sent <Badge bg={sentNotifyNum>0 ? "danger" : "secondary"} pill='true' style={{marginLeft:"1rem"}}>{sentNotifyNum}</Badge></Button>
      </div>
      <div className='notification-container' >
        {showReceivedReq && recNotifications.map((notification)=>{
          return <div className='requestsReceived mt-5 pb-1 pt-3'>
          <p className='notify-text'>You have a request from <b>Dr. {doctorName}</b>  to exchange the working slot <b>{notification.workingslot}</b> on <b>{notification.date}nd of March
          </b> to working slot <b>{notification.shiftwith}</b> on <b>{notification.datewith}th of March</b></p>
          <span className='accept-decline-btns'>
            <Button className='accept-btn' variant='success' type='button' onClick={()=>closeRecNotify(notification.id)}>Accept</Button>
            <Button className='decline-btn' variant='danger' type='button' onClick={()=>closeRecNotify(notification.id)}>Decline</Button>
          </span>
        </div>
        })}


        {showSentReq && sentNotifications.map((notification)=>{ 
        return <div className='requestsSent mt-5 pb-3 pt-3'>
          <p className='notify-text'>Your request to <b>Dr. {doctorName}</b>  for exchange the working slot <b>{notification.workingslot}</b> on <b>{notification.date}nd of March
          </b> to working slot <b>{notification.shiftwith}</b> on <b>{notification.datewith}th of March </b> has been {notification.state ? <b>accepted</b> : <b>declined</b>}</p>
          <span className='request-close-btns'>
            {!notification.state && <Link className='shift-request-btn' to='/shiftRequest'><Button  variant='success' type='button'>Request again</Button></Link>}
            <Button className='close-btn' variant='outline-success' onClick={()=>closeSentNotify(notification.id)}><GiCheckMark size={25} style={{color:"rgb(1, 219, 0)"}}/></Button>
          </span>
        </div>
        })}
      </div>  
    </div>
  )
}

export default Notifications
          