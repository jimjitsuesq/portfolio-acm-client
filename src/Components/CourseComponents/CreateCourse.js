import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router';
import ValidationErrors from '../ErrorComponents/ValidationErrors';
/**
 * 
 * @param {varies} props Properties sent from the App component containing 
 * user data
 * @returns A form that allows a logged-in user to create a new course
 */
function CreateCourse (props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    const [userId, setUserId] = useState(0)
    const [validationErrors, setValidationErrors] = useState([]);
    const [error500Status, setError500Status] = useState(false);
    let history = useHistory()

    if(userId !== props.userData.id) {
        setUserId(props.userData.id)
    }

/** 
 * Handles the submission of data to create the new course.
 * 
 */
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
        try {
            await axios.post('https://portfolio-acm-server.wn.r.appspot.com/api/courses', course, {
                auth: {
                    username: props.userData.emailAddress,
                    password: props.userData.password
                }
            })
            console.log('Course Created')
            history.push('/')
        }   catch (error) {
            if(error.response) {
                if (error.response.status === 500) {
                    setError500Status(true)
                    console.log(error500Status)
                }  
                if (error.response.status === 400) {
                    setValidationErrors(error.response.data.errors)
                }
            }  else {
                    console.log(error.response)
            }  
            if (error.request) {
                console.log(error.request)
            }  else {
                console.log(error);
            }
        }
    };

    if (error500Status === true) {
        return <Redirect to="/error" />
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
                    <button className="button" type="submit" >Create Course</button><a className="button button-secondary" href="/">Cancel</a>
                </form>
            </div>
    )
}

export default CreateCourse