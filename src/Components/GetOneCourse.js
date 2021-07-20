import React, {useEffect, useState } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';
import { useParams } from 'react-router-dom';

function GetOneCourse() {
    const [isLoading, setLoading] = useState(true);
    const [course, getCourse] = useState([]);
    const [user, getUser] = useState([]);
    const [materials, getMaterials] = useState([]);
    let { id } = useParams();
    
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
            getCourse(response.data.course)
            setLoading(false);
        };
        fetchCourse();
    }, []);
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <CourseDetail courseData={course} userData={user} materialsData={materials} />
    )
}

export default GetOneCourse;