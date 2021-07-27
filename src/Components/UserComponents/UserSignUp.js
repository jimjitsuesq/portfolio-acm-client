import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import ValidationErrors from '../ErrorComponents/ValidationErrors';
/**
 * Component where a new user can sign up.
 * @returns A form used for a new user to sign up, or an error page if a
 * server error is thrown
 */
function UserSignUp () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [error500Status, setError500Status] = useState(false)
    let history = useHistory()
/**
 * Handles submission of the user signup form, setting errors and finally
 * redirecting back to the home page after signup.
 * @param {event} e 
 */
    const handleSubmit = async (e) => {
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }
        console.log(user)
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', user)
            console.log('User Created')
            history.push('/')
        } catch(error) {
            if(error.response.status === 500) {
                setError500Status(true)
            } else {
                if(error.response.status === 400) {
                    setValidationErrors(error.response.data.errors) 
                } else {
                console.log(error);
                }
            }
        }
    };

    if (error500Status === true) {
        return <Redirect to="/error" />
    }

    return (
        <div className="form--centered">
                    <h2>Sign Up</h2>
                        {(validationErrors.length > 0) && <ValidationErrors validationErrors={validationErrors}/>}
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
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary"> <a href='/'>Cancel</a></button>
                      </div>
                    </form>
                    <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
                </div>
    )
}

export default UserSignUp;