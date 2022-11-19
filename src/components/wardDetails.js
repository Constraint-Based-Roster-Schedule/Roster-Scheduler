import { useEffect, useState } from 'react';
import WardRosterComponent from './wardRosterComponent';
import '../CSS/searchWardRoster.css'
import Box from '@mui/material/Box';
import Axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function WardDetails(props) {

  const [wardName,setwardName]=useState('');
  const [docDetails,setDocDetails]=useState([]);
  const [consultantDetails,setConsultantDetails]=useState([]);
  const [wardObj,setWardObj]=useState("6371a53b963e2cb4f2f65a0c");

  useEffect(()=>{
    fetchWardDetails();
  },[props.wardID])

  const fetchWardDetails=async()=>{
    const ward=props.wardID;

    await Axios.get("http://localhost:5000/user/admin/getWardDetails",{
            params:{"wardID":ward}
        }).then((res) => {

          setwardName(res.data.wardName);
          setDocDetails(res.data.docData);
          setConsultantDetails(res.data.consultantData);
          setWardObj(res.data.wardObj.toString())
          console.log(wardObj)
        })
  }

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box className='ward-detail-container'>
        <h1 className='font-monospace' style={{textAlign:"center", marginTop:"1rem",fontSize:"2em", color:"white"}}>Ward number {props.wardID}</h1>
        <div className='data-card'>
          <div className='ward-det'>
            <p className='ward-detail-p'>ward name     :  {wardName}</p>
            <p className='ward-detail-p'>Consultant details</p>
            {consultantDetails.map((cons)=>{
              return <div>
                <p className='const-detail-p'>Name   :  {cons[0]} {cons[1]} </p>
                <p className='const-detail-par'>Email   :  {cons[2]} </p>
                <p className='const-detail-par'>Contact number  :  {cons[3]} </p>
              </div>
            })}
          </div>
          <div className='doc-det'>
            <h1 className='doc-topic'>Ward doctors</h1>
            {docDetails.map((doc,index)=>{
              return (
                <div className='doc-container'>
                  <p className='doc-detail'>Name : {doc[0]} {doc[1]}</p>
                  <p className='doc-sub-detail'>Email : {doc[2]}</p>
                  <p className='doc-sub-detail'>Contact number : {doc[3]}</p>
                </div>
              )
            })}
            
          </div>
        </div>
      <div className='open-ward-details'>
      <Button className='ward-modal-button' variant='primary' style={{backgroundColor:"white"}} onClick={handleClickOpen('paper')}>Ward Deatils</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          style: {
            //maxHeight: ITEM_HEIGHT * 4.5,
            width: '60ch',
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">Ward details</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          
            <Box className='ward-model-box' id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
              <div className='modal-ward-container'>
                <p className='modal-ward-det' ><b>ward name     :</b>  {wardName}</p>
                <p  className='modal-ward-det'  ><b>ward number    : </b> {props.wardID}</p>
                <h1 style={{fontSize:"1.5rem",marginTop:"2rem",marginBottom:"2rem"}}  >Consultant details</h1>
                <p className='modal-consultant-det'><b>Consultant name   : </b> {consultantDetails[0]} {consultantDetails[1]} </p>
                <p className='modal-consultant-det'><b>Consultant email   :</b>  {consultantDetails[2]} </p>
                <p className='modal-consultant-det'><b>Consultant contact number  : </b> {consultantDetails[3]} </p>
              </div>
              <div className='modal-doc-container'>
                <h1 style={{fontSize:"1.5rem",marginTop:"2rem"}}>Ward doctors</h1>
                {docDetails.map((doc,index)=>{
                  return (
                    <div className='modal-doc'>
                      <p className='modal-doc-det'><b>Name :</b> {doc[0]} {doc[1]}</p>
                      <p className='modal-doc-det'><b>Email :</b> {doc[2]}</p>
                      <p className='modal-doc-det'><b>Contact number :</b> {doc[3]}</p>
                    </div>
                  )
                })}
                
              </div>
            </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
        <WardRosterComponent wardID={wardObj}/>
    </Box>
  )
}

export default WardDetails