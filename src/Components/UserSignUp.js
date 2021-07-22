import React, { useState } from 'react';
import axios from 'axios';

function UserSignUp () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const handleSubmit = (e) => {
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }
        console.log(user)
        // e.preventDefault();
        // setSubmitted(true);
        axios
            .post('http://localhost:5000/api/users', user)
            .then(() => console.log('User Created'))
            .then(() => {(window.location=`/`)})
            .catch(err => {
                console.error(err);
        })
    };
    return (
        <div className="form--centered">
                    <h2>Sign Up</h2>
                    
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} 
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            value={lastName}
                            onChange={e => setLastName(e.target.value)} 
                        />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="email" 
                            value={emailAddress}
                            onChange={e => setEmailAddress(e.target.value)} 
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            value={confirmedPassword}
                            onChange={e => setConfirmedPassword(e.target.value)}  
                        />
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary"> <a href='/'>Cancel</a></button>
                      </div>
                    </form>
                    <p>Already have a user account? Click here to <a href="/api/signin">sign in</a>!</p>
                </div>
    )
}

export default UserSignUp;