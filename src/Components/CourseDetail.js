import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [course, getCourse] = useState([]);
    const [thisCourseUserId, setThisCourseUserId] = useState();
    let materials = course.materialsNeeded
    let splitMaterials;
    let { id } = useParams();
    
    function splitter () {
        if(materials) {
            splitMaterials = course.materialsNeeded.split('*')
        } else {
            splitMaterials = [ 'None']
        }
    }
    splitter()
    const deleteCourse = () => {
        axios
            .delete(`http://localhost:5000/api/courses/${id}`)
            .then(() => console.log('Course Deleted'))
            .then(() => {(window.location='/')})
            .catch(err => {
                console.error(err)
            })
    }   
    useEffect(() => {
        const FetchCourse = async () => {        
            const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
            getCourse(response.data.course)
            setThisCourseUserId(response.data.course.User.id)
            setLoading(false);
        };
        FetchCourse();
        }, []);
    if (isLoading) {
        return <div>Loading...</div>
    } else {
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

                        <p>{course.description}</p>
                    </div>
                
            
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                            {splitMaterials.slice(1).map((material, index) => <li key={index}>{material}</li>)}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
    }
}

export default CourseDetail;