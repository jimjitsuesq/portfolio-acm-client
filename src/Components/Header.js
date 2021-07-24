import React, { useState } from 'react';

function Header (props) {
    const retrievedPayload = localStorage.getItem('userInfo')
    console.log(retrievedPayload)
    const unzippedPayload = JSON.parse(retrievedPayload)
    console.log(unzippedPayload)
    if(props.isLoggedIn === true) {
        return(
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, {unzippedPayload.firstName}!</li>
                            <li><a href="/api/signout">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>    
            </header>
        )
    } else {
        return(
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><a href="/api/signup">Sign Up</a></li>
                            <li><a href="/api/signin">Sign In</a></li>
                        </ul>
                    </nav>
                </div>    
            </header>
        )
    }
}

export default Header;