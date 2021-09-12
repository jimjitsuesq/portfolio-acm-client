import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Course from "./Course";
/**
 *
 * @returns The home screen with a list of all courses
 */
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error500Status, setError500Status] = useState(false);

  /**
   * Calls the fetchCourses function when the component mounts that retrieves
   * all courses from the server.
   */
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(
          "https://portfolio-acm-client.netlify.app/api/courses"
        );
        let courseData = response.data.courses;
        let allCourses = courseData.map((course) => (
          <Course
            courseId={course.id}
            key={course.id}
            courseTitle={course.title}
          />
        ));
        setCourses(allCourses);
      } catch (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 500) {
            setError500Status(true);
          } else {
            console.log(error.response);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error);
        }
      }
    }
    fetchCourses();
  }, [error500Status]);

  if (error500Status === true) {
    return <Redirect to="/error" />;
  }

  return (
    <div className="wrap main--grid">
      {courses}
      <a className="course--module course--add--module" href="/courses/create">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          Create a New Course
        </span>
      </a>
    </div>
  );
};

export default Courses;
