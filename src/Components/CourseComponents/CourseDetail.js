import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useHistory, Redirect } from 'react-router-dom';

function CourseDetail (props) {
    const [isLoading, setLoading] = useState(true);
    const [course, getCourse] = useState();
    const [materials, getMaterials] = useState();
    const [thisCourseUserId, setThisCourseUserId] = useState();
    const [noCourse, setNoCourse] = useState(false);
    const [error500Status, setError500Status] = useState(false)
    let { id } = useParams();
    let history = useHistory();

    const deleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                auth: {
                    username: props.userData.emailAddress,
                    password: props.userData.password
                }   
            })
            console.log('Course Deleted')
            history.push('/')
        } catch (error) {
            if(error.response.status === 500) {
                setError500Status(true)
            } else {
                console.log(error)
            }
        }
    }
    
    useEffect(() => {
        const fetchCourse = async () => {
            try {     
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
                getCourse(response.data.course)
                setThisCourseUserId(response.data.course.User.id)
                getMaterials(response.data.course.materialsNeeded)
                setLoading(false)
            } catch (error) {
                if(error.response.status === 500) {
                    setError500Status(true)
                } else {
                    if(error.response.status === 404) {
                        setNoCourse(true) 
                    } else {
                        console.log(error);
                    }
                }
            }
        }
        fetchCourse()
    }, [id]);
        
    if (noCourse === true) {
        return <Redirect to="/notfound" />
    } 
    
    if (error500Status === true) {
        return <Redirect to="/error" />
    }

    if (isLoading) {
        return <div>Loading...</div>
    } 

    return (
        <>
        <div className="actions--bar">
            <div className="wrap">
                {(props.userId === thisCourseUserId) &&
                <>
                <a className="button" href={`${course.id}/update`}>Update Course</a>
                <button className="button" onClick={deleteCourse}>Delete Course</button>
                </>
                }
                <a className="button button-secondary" href="/">Return to List</a>
            </div>
        </div>
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>By {course.User.firstName} {course.User.lastName}</p>
                        <ReactMarkdown>{course.description}</ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown className="course--detail--list">{materials}</ReactMarkdown>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
    
}

export default CourseDetail;