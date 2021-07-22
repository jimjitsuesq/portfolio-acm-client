import React, { useState } from 'react';
import axios from 'axios';

function UserSignIn () {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        const user = {
            emailAddress,
            password
        }
        console.log(user)
        e.preventDefault();
        // setSubmitted(true);
        axios
            .get('http://localhost:5000/api/users', {
                auth: {
                    username: user.emailAddress,
                    password: user.password
                }
            })
            .then(() => console.log('User Signed In'))
            .then(() => {(window.location=`/`)})
            .catch(err => {
                console.error(err);
        })
    };
    return (
        <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
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
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary"> <a href='/'>Cancel</a></button>
                </form>
                <p>Don't have a user account? Click here to <a href="signup">sign up</a>!</p>
                
            </div>
    )
}

export default UserSignIn;