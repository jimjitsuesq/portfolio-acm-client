import React from 'react';

const Course = (props) => (
    <>
    <a className="course--module course--link" href = {`api/courses/${props.courseId}`}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{props.courseTitle}</h3>
    </a>
    </>
)

export default Course;