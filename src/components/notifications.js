import React, { useEffect, useState } from 'react';
import {TbExchange} from 'react-icons/tb';
import {MdNotifications} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import '../CSS/notifications.css';
import { Link } from 'react-router-dom';
import authService from "../auth_service/auth_services";
import Axios from "axios";


function Notifications() {
  const [recNotifications,setRecNotifications]=useState([]);
  const [sentNotifications,setSentNotifications]=useState([])
  const recNotifyNum=recNotifications.length;
  const sentNotifyNum=sentNotifications.length;
  const [shiftNames,setShiftNames]=useState([])
  const [showReceivedReq, setShowReceivedReq]=useState(true);
  const [showSentReq,setShowSentReq]=useState(false);

  useEffect(()=>{
    fetchNotifications();
    fetchShiftnames();
  },[])



  const fetchNotifications=async()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month=monthNames[new Date().getMonth()].toLowerCase();
    const year=new Date().getFullYear();
    const date=new Date().getDate();
    const doc_id=authService.getUserID().toString();
    await Axios.get("http://localhost:5000/user/doctor/getOutNotif",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"docID":doc_id,"month":month,"year":year,"date":+date}
    }).then((res) => {
      setRecNotifications(res.data.received);
      setSentNotifications(res.data.sent)
    })
  }

  const fetchShiftnames=async()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month=monthNames[new Date().getMonth()].toLowerCase();
    const year=new Date().getFullYear();
    await Axios.get("http://localhost:5000/user/doctor/getShiftNames",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"month":month,"year":year,"wardID":authService.getWardID().toString()}
    }).then((res) => {

      setShiftNames(res.data.shiftNames)
    })
  }

  const acceptRecNotify=async(i)=>{
    await Axios.get("http://localhost:5000/user/doctor/acceptRequest",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"notifID":i}
    }).then((res) => {

      setRecNotifications(current =>
        current.filter(notification => {
          return notification.id !== i;
        }),
      );
    })
    
  } 

  const declineRecNotify=async(i)=>{
    await Axios.get("http://localhost:5000/user/doctor/declineRequest",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"notifID":i}
    }).then((res) => {

      setRecNotifications(current =>
        current.filter(notification => {
          return notification.id !== i;
        }),
      );
    })
  } 

  const closeSentNotify=async(i)=>{
    await Axios.get("http://localhost:5000/user/doctor/closeNotification",{
      headers: { "x-auth-token": authService.getUserToken() },
      params:{"notifID":i}
    }).then((res) => {

      setSentNotifications(current =>
        current.filter(notification => {
          return notification.id !== i;
        }),
      );
    })
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
          <p className='notify-text'>You have a request from <b>Dr. {notification.doctorName}</b>  to exchange the <b>{shiftNames[notification.workingslot][0]}</b> on <b>{notification.date}nd of March
          </b> to <b>{shiftNames[notification.shiftwith][0]}</b> on <b>{notification.datewith}th of March</b></p>
          <span className='accept-decline-btns'>
            <Button className='accept-btn' variant='success' type='button' onClick={()=>acceptRecNotify(notification.id)}>Accept</Button>
            <Button className='decline-btn' variant='danger' type='button' onClick={()=>declineRecNotify(notification.id)}>Decline</Button>
          </span>
        </div>
        })}


        {showSentReq && sentNotifications.map((notification)=>{ 
        return <div className='requestsSent mt-5 pb-3 pt-3'>
          <p className='notify-text'>Your request to <b>Dr. {notification.doctorName}</b>  for exchange the <b>{shiftNames[notification.workingslot][0]}</b> on <b>{notification.date}nd of March
          </b> to <b>{shiftNames[notification.shiftwith][0]}</b> on <b>{notification.datewith}th of March </b> has been {notification.state===2 ? <b>accepted</b> : <b>declined</b>}</p>
          <span className='request-close-btns'>
            {notification.state===3 && <Link className='shift-request-btn' to='../shiftRequest'><Button  variant='success' type='button'>Request again</Button></Link>}
            <Button className='close-btn' variant='outline-success' onClick={()=>closeSentNotify(notification.id)}><GiCheckMark size={25} style={{color:"rgb(1, 219, 0)"}}/></Button>
          </span>
        </div>
        })}
      </div>  
    </div>
  )
}

export default Notifications
          