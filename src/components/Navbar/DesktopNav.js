import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo_1 from '../../assets/images/logos/logo_moonlike_1.svg'

function DesktopNav() {
    const headerRef = useRef(null);
    useEffect(() => {
        if (headerRef.current) {
            const visina = headerRef.current.offsetHeight;
            document.documentElement.style.setProperty('--visina-headera', `${visina}px`);
        }
    }, [headerRef]);
    return (
        <nav className='desktop-nav' ref={headerRef}>
            <div className="nav-logo"><img src={logo_1} alt="logo_moonlike_space" /></div>
            <div className="nav-links">
                <NavLink to="/" className="nav-link"><span>Who We Are?</span></NavLink>
                <NavLink to="/" className="nav-link" onClick={() => {
                    document.getElementById('why-moonlike-space').scrollIntoView({ behavior: 'smooth' });
                }}><span>Why Moonlike._?</span></NavLink>
                <NavLink to="/" className="nav-link"><span>Get What You Want</span></NavLink>
                <NavLink to="/" className="nav-link"><span>Contact us</span></NavLink>
            </div>
        </nav>
    )
}

export default DesktopNav