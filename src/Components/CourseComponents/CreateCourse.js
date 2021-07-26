import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router';
import ValidationErrors from '../ErrorComponents/ValidationErrors';

function CreateCourse (props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    const [userId, setUserId] = useState()
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [error500Status, setError500Status] = useState(false);
    const cookieValue = document.cookie.split('=')[1]
    let history = useHistory()
    const loggedInUser = localStorage.getItem('userInfo')
    const foundUser = JSON.parse(loggedInUser);
        
    useEffect(() => {
        setUserId(foundUser.id);
        setEmailAddress(foundUser.emailAddress);
        setPassword(foundUser.password)
    }, [])
    
    const handleSubmit = async (e) => {
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }
        console.log(course)
        e.preventDefault();
        console.log(emailAddress)
        console.log(password)
        // console.log(props.userData.password)
        // console.log(JSON.stringify(password))
        // console.log(cookieValue)
        // console.log(foundUser.password)
        try {
            const response = await axios.post('http://localhost:5000/api/courses', course, {
                auth: {
                    username: emailAddress,
                    password: password
                }
            })
            console.log('Course Created')
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
        return <Redirect to="/api/error" />
    }

    return(
        <div className="wrap">
                <h2>Create Course</h2>
                    {(validationErrors.length > 0) && <ValidationErrors validationErrors={validationErrors}/>}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={title}
                                onChange={e => setTitle(e.target.value)} 
                            />
                            <p>By {props.userData.firstName + ' ' + props.userData.lastName} </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={estimatedTime}
                                onChange={e => setEstimatedTime(e.target.value)} 
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded" 
                                value={materialsNeeded}
                                onChange={e => setMaterialsNeeded(e.target.value)}>
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" >Create Course</button><button className="button button-secondary"><a href="/">Cancel</a></button>
                </form>
            </div>
    )
}

export default CreateCourse