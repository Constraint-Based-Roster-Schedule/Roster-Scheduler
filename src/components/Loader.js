import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "../CSS/loader.css";
var Spinner = require('react-spinkit');

function Loader() {
    return (
    <div className='loader-container'>
        <Spinner className='spinner' name="ball-spin-fade-loader" />
        {/* <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
        </Stack> */}
    </div>    
    
    );
}

export default Loader