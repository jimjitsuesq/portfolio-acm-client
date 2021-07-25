import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';

function UpdateCourse (props) {
    const [isLoading, setLoading] = useState(true);
    const [thisCourseUserId, setThisCourseUserId] = useState();
    const [course, getCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [noCourse, setNoCourse] = useState(false);

    let { id } = useParams();
    let materials = course.materialsNeeded
    let history = useHistory()
    let currentUser = props.userData.id
    console.log(props.userData.id)
    const HandleSubmit = async (e) => {
        console.log(id)
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            thisCourseUserId
        }
        console.log(course)
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
                auth: {
                    username: props.userData.emailAddress,
                    password: props.userData.password
                }   
            })
            console.log((response).data.errors)
            console.log('Course Updated')
            history.push('/')
        } catch(error) {
            console.log(error.response.data.errors);
            setValidationErrors(error.response.data.errors)
        }
    }
    const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
            getCourse(response.data.course)
            setThisCourseUserId(response.data.course.userId)
            console.log(currentUser)
            console.log(course)
            console.log(thisCourseUserId)
            
            setTitle(response.data.course.title)
            setDescription(response.data.course.description)
            setEstimatedTime(response.data.course.estimatedTime)
            setMaterialsNeeded(response.data.course.materialsNeeded)
            setLoading(false)
        } catch (error) {
            setNoCourse(true)
        }
        console.log(currentUser)
        console.log(thisCourseUserId)
        
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    if (noCourse===true) {
        return <Redirect to="/notfound" />
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
                                            defaultValue={course.title}
                                            value={title}
                                            onChange={e => setTitle(e.target.value)} 
                                        />
                                        <p>By {props.userData.firstName + ' ' + props.userData.lastName} </p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea 
                                            id="courseDescription" 
                                            name="courseDescription" 
                                            defaultValue={course.description}
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
                                            defaultValue={course.estimatedTime}
                                            value={estimatedTime}
                                            onChange={e => setEstimatedTime(e.target.value)} 
                                        />
                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            defaultValue={materials}
                                            value={materialsNeeded}
                                            onChange={e => setMaterialsNeeded(e.target.value)}>
                                            
                                        </textarea>
                                    </div>
                                </div>
                                <button className="button" type="submit" onClick={HandleSubmit}>Update Course</button><button className="button button-secondary"><a href={`/api/courses/${course.id}`}>Cancel</a></button>
                            </form>
                        </div>
                )
            } else {
                return <Redirect to="/api/forbidden" />
            }
}


export default UpdateCourse;