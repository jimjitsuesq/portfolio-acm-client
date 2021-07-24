import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse () {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    const userId = 1;
    
    const handleSubmit = (e) => {
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }
        console.log(course)
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/courses', course)
            .then(() => console.log('Course Created'))
            .then(() => {(window.location=`/`)})
            .catch(err => {
                console.error(err);
        })
    };
    return(
        <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
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
                            <p>By USER</p>

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