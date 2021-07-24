import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UserSignIn (props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit()
    }
    return (
        <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={props.emailAddress} 
                        onChange={e => props.setEmailAddress(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={props.password}
                        onChange={e => props.setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary"> <a href='/'>Cancel</a></button>
                </form>
                <p>Don't have a user account? Click here to <a href="signup">sign up</a>!</p>
                
            </div>
    )
}

export default UserSignIn;