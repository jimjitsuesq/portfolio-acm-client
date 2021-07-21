import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Courses from './Courses';

function GetCourses() {
    const [courses, getCourses] = useState([]);
    useEffect(() => {
        fetchCourses()
    }, []);
    const fetchCourses = () => {
        axios.get(' http://5d574ad5fb43.ngrok.io/api/courses')
            .then((response) => {
                const allCourses = response.data.courses
                getCourses(allCourses)
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    return(
            <Courses data={courses} />
    )
}

export default GetCourses;