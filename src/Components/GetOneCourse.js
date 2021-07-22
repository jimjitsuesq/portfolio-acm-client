import React, {useEffect, useState } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';
import { useParams } from 'react-router-dom';

function GetOneCourse() {
    const [isLoading, setLoading] = useState(true);
    const [course, getCourse] = useState([]);
    let { id } = useParams();
    
    useEffect(() => {
        const FetchCourse = async () => {
            
            const response = await axios.get(` http://5d574ad5fb43.ngrok.io/api/courses/${id}`);
            getCourse(response.data.course)
            setLoading(false);
        };
        FetchCourse();
    }, []);
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <CourseDetail courseData={course} />
    )
}

export default GetOneCourse;