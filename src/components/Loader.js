import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "../CSS/loader.css";
var Spinner = require('react-spinkit');

function Loader() {
    return (
    <div data-testid="loader" className='loader-container'>
        <Spinner className='spinner' name="ball-spin-fade-loader" />
    </div>    
    
    );
}

export default Loader