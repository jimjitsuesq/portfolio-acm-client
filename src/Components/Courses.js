import React from 'react';
import Course from './Course';

const Courses = props => {
    const allCourses = props.data
    let courses = allCourses.map(course => <Course courseId={course.id} key={course.id} courseTitle={course.title} />)
    return (
        <div className="wrap main--grid">
            {courses}
            <a className="course--module course--add--module" href="/api/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
  }

export default Courses;