import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

/**
 * Component that handles signing in a registered user either via link or after 
 * redirect from a private route.
 * @param {varies} props Passes properties from App.js React Router, as well as 
 * The history used for redirect after successful sign in 
 * @returns A form for a registered user to sign in with
 */
function UserSignIn (props) {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    let location = useLocation()
    let history = useHistory()
    let lastLocation
    console.log(lastLocation)
    if(location.state !== undefined) {
        if(location.state.from.pathname !== '/signout') {
            lastLocation = (location.state.from.pathname) 
        } else {
        lastLocation = '/'
        }
    }
    
/**
 * The actual function that signs in a user with a GET API call, sets the
 * logged-in state to "true", and puts the user's data in local storage
 */
    async function signIn () {
        try {
            const response = await axios.get('https://portfolio-acm-client.netlify.app/api/users', {
                auth: {
                    username: emailAddress,
                    password: password
                },
            })
            const responseJSON = JSON.stringify(response.data.authenticatedUser)
            localStorage.setItem('userInfo', responseJSON)
            props.setIsLoggedIn(true)
            setLocalUser()
            console.log('User Signed In')
            history.push(lastLocation)
        } catch (error) {
            if(error.response) {
                if (error.response.status === 500) {
                props.setError500Status(true)
                console.log(props.error500Status)
                } else {
                    console.log(error.response)
                }
            }   else if (error.request) {
                console.log(error.request)
            }   else {
                console.log(error);
            }
        }
    }

/**
 * Uses local storage to set the user information state of the component
 */
    async function setLocalUser () {
        const loggedInUser = localStorage.getItem('userInfo')
        if (loggedInUser !== null) {
            const foundUser = JSON.parse(loggedInUser);
            props.setUserData(foundUser);
        }
    }

/**
 * Handles submission of user credentials to the server for validation
 * @param {event} e
 */
    const handleSubmit = (e) => {
        e.preventDefault()
        signIn()
    }

    return (
        <div className="form--centered">
            <div className="sign-in-div">
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
        </div>
    )
}

export default UserSignIn;