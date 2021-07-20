import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Courses from './Courses';

function GetCourses() {
    const [courses, getCourses] = useState([]);
    useEffect(() => {
        fetchCourses()
    }, []);
    const fetchCourses = () => {
        axios.get('https://sharp-mayfly-72.loca.lt/api/courses')
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