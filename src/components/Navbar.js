import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';


const Navbar = () => {
    const [ show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        // clean up
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])


    return (
        <div className={`navbar ${ show && 'navbar__black'}`}>
            <div className="navbar__contents">
                <img
                onClick={() => history.push('/')}
                className="navbar__logo" alt="netflix-logo" 
                src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"/>

                <img onClick={() => history.push('/profile')}
                className="navbar__avatar" alt="netflix-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"/>
            </div>
        </div>
        
        
    )
}

export default Navbar;
