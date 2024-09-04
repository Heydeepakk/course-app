import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import "./CourseList.css";
import Header from '../Header/Header'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header buttonText="Enrolled List" buttonLink="/" />
      <div className="course-list-container">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="course-list">
          {filteredCourses.length === 0 ? (
            <p className="no-data">No data found</p>
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-item">
                <Link to={`/course/${course.id}`} className="course-link">
                  <h2>{course.name}</h2>
                  <p>{course.instructor}</p>
                  <p>Enrollment Status: {course.enrollmentStatus}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
