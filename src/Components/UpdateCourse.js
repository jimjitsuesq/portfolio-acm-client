import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function UpdateCourse (props) {
    const [isLoading, setLoading] = useState(true);
    const [thisCourseUserId, setThisCourseUserId] = useState();
    const [course, getCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    let { id } = useParams();
    let materials = course.materialsNeeded
    let history = useHistory()

    const HandleSubmit = (e) => {
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
            axios.put(`http://localhost:5000/api/courses/${id}`, course, {
                auth: {
                    username: props.userData.emailAddress,
                    password: props.userData.password
                }   
            })
            console.log('Course Updated')
            // history.push('/')
        
            // console.log(error);
    }
    /* useEffect(() => {
        const FetchCourse = async () => {
            
            const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
            getCourse(response.data.course)
            setThisCourseUserId(response.data.course.User.id)
            setTitle(response.data.course.title)
            setDescription(response.data.course.description)
            setEstimatedTime(response.data.course.estimatedTime)
            setMaterialsNeeded(response.data.course.materialsNeeded)
            setLoading(false);
        };
        FetchCourse();
    }, []); */
    return(
        <div className="wrap">
                <h2>Update Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
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
}

export default UpdateCourse;