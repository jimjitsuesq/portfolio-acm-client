import React from 'react';

const Header = () => (
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

export default Header;