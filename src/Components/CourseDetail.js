import React from 'react';


const CourseDetail = props => {
    let course = props.courseData
    let materials = course.materialsNeeded
    let splitMaterials;
    function splitter () {
        if(materials) {
            splitMaterials = course.materialsNeeded.split('*')
        } else {
            splitMaterials = [ 'None']
        }
    }
    splitter()
    console.log(course)
    return (
        <>
        <div className="actions--bar">
            <div className="wrap">
                <a className="button" href={`api/courses/${course.id}/update`}>Update Course</a>
                <a className="button" href={`api/courses/${course.id}`}>Delete Course</a>
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
                            {splitMaterials.map(material => <li>{material}</li>)}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default CourseDetail;