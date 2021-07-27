import React from 'react';
/**
 * 
 * @param {varies} props Props sent from the Courses component for rendering 
 * @returns Each of the "buttons" representing each course on the home screen
 */
function Course (props) {
    return (
    <>
    <a className="course--module course--link" href = {`courses/${props.courseId}`}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{props.courseTitle}</h3>
    </a>
    </>
    )
}

export default Course;