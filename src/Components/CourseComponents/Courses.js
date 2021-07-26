import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';

import Course from './Course';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [error500Status, setError500Status] = useState(false)
    async function fetchCourses () {
        try {
            const response = await axios.get('http://localhost:5000/api/courses')
            let courseData = response.data.courses
            let allCourses = courseData.map(course => <Course courseId={course.id} key={course.id} courseTitle={course.title} />)
            setCourses(allCourses)
        } catch (error) {
            if(error.response.status === 500) {
                setError500Status(true)
            } else {
            console.log(error)
            }
        }
    }
    useEffect(() => {
        fetchCourses()
    }, []);

    if (error500Status === true) {
        return <Redirect to="/api/error" />
    } 
    
    return(
        <div className="wrap main--grid">
            {courses}
            <a className="course--module course--add--module" href="/api/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );  
}

export default Courses;