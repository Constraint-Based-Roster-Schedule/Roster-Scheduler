import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import {BsFillPersonFill} from 'react-icons/bs';
import {HiHome} from 'react-icons/hi';
import {HiInformationCircle} from 'react-icons/hi';
import logo from '../public/Group 3.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
        linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
        linksContainerRef.current.style.height = '0px';
        }
    }, [showLinks]);

    const linkstyle={
        marginLeft:"100px" , 
        fontSize:'20px',
        textDecoration: 'none'
    }

    return (
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <img src={logo} className='logo' alt='logo' />
                    <button className='nav-toggle' onClick={toggleLinks}>
                        <FaBars />
                    </button>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                    <ul className='links' ref={linksRef}>
                        <Link className="navLink" to='/'style={linkstyle}><span>Home<HiHome size={30} style={{marginLeft:'15px', marginTop:"-8px"}}/></span></Link>                       
                        <Link to='/about' style={linkstyle}><span>About<HiInformationCircle size={30} style={{marginLeft:'15px', marginTop:"-8px"}}/></span></Link>                      
                        <Link to='/profile' style={linkstyle}><span>Profile<BsFillPersonFill size={30} style={{marginLeft:'15px',marginTop:"-8px"}}/></span></Link>                       
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
