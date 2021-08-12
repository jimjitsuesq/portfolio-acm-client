import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import ValidationErrors from '../ErrorComponents/ValidationErrors';
/**
 * 
 * @param {varies} props Properties sent from the App component containing 
 * user data
 * @returns A form that allows a logged-in owner of a course to update its data
 */
function UpdateCourse (props) {
    const [isLoading, setLoading] = useState(true);
    const [thisCourseUserId, setThisCourseUserId] = useState();
    const [course, getCourse] = useState([]);
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description)
    const [estimatedTime, setEstimatedTime] = useState(course.estimatedTime)
    const [materialsNeeded, setMaterialsNeeded] = useState(course.materialsNeeded)
    const [validationErrors, setValidationErrors] = useState([])
    const [noCourse, setNoCourse] = useState(false);
    const [error500Status, setError500Status] = useState(false)

    let { id } = useParams();
    let history = useHistory()
    let currentUser = props.userData.id

/**
 * Handles the submission of the updated form data to the server
 * @param {event} e 
 */

    const HandleSubmit = async (e) => {
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            thisCourseUserId
        }
        e.preventDefault();
        try {
            await axios.put(`https://portfolio-acm-server.wn.r.appspot.com/api/courses/${id}`, course, {
                auth: {
                    username: props.userData.emailAddress,
                    password: props.userData.password
                }   
            })
            history.push('/')
        } catch (error) {
            if(error.response) {
                if (error.response.status === 500) {
                setError500Status(true)
                console.log(error500Status)
                } else {
                    if(error.response.status === 400) {
                        setValidationErrors(error.response.data.errors)
                    }
                    if(error.response.status === 404) {
                        setNoCourse(true) 
                    } else {
                    console.log(error.response)
                    }
                }
            }   else if (error.request) {
                console.log(error.request)
            }   else {
                console.log(error);
            }
        }
    }
/**
 * Prepopulates the UpdateCourse form with course data from the server when the
 * component mounts
 */
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://portfolio-acm-server.wn.r.appspot.com/api/courses/${id}`)
                getCourse(response.data.course)
                setThisCourseUserId(response.data.course.userId)
                setTitle(response.data.course.title)
                setDescription(response.data.course.description)
                setEstimatedTime(response.data.course.estimatedTime)
                setMaterialsNeeded(response.data.course.materialsNeeded)
                setLoading(false)
            } catch (error) {
                if(error.response) {
                    if (error.response.status === 500) {
                    setError500Status(true)
                    console.log(error500Status)
                    } else {
                        if(error.response.status === 400) {
                            setValidationErrors(error.response.data.errors)
                        }
                        if(error.response.status === 404) {
                            setNoCourse(true) 
                        } else {
                        console.log(error.response)
                        }
                    }
                }   else if (error.request) {
                    console.log(error.request)
                }   else {
                    console.log(error);
                }
            }
        }
        fetchCourse()
    }, [id, error500Status]);
/**
 * Logic that determines what component is loaded, depending on the user and
 * what is returned from the server.
 */
    if (noCourse===true) {
        return <Redirect to="/notfound" />
    }

    if (error500Status === true) {
        return <Redirect to="/error" />
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    if (currentUser === thisCourseUserId) {
        return (
            <div className="wrap">
                    <h2>Update Course</h2>
                        {(validationErrors.length > 0) && <ValidationErrors validationErrors={validationErrors}/>}
                    <form onSubmit={HandleSubmit}>
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
                        <button className="button" type="submit" onClick={HandleSubmit}>Update Course</button><button className="button button-secondary"><a href={`/courses/${course.id}`}>Cancel</a></button>
                    </form>
                </div>
        )
    } else {
        return <Redirect to="/forbidden" />
            }
}

export default UpdateCourse;