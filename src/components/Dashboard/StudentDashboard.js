import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc } from "../../firebaseConfig";
import "./StudentDashboard.css";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

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

  const openCourses = courses.filter(
    (course) => course.enrollmentStatus === "Open"
  );

  const handleMarkAsCompleted = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, {
        enrollmentStatus: "Closed",
      });
      // Update local state
      setCourses(
        courses.map((course) =>
          course.id === courseId
            ? { ...course, enrollmentStatus: "Closed" }
            : course
        )
      );
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  return (
    <div>
      <div className="student-dashboard-container">
        <h1>My Enrolled Courses</h1>
        <br />
        <div className="course-list">
          {openCourses.map((course) => (
            <div key={course.id} className="course-item">
              <Link to={`/course/${course.id}`} className="course-link">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="course-thumbnail"
                />
                <div className="course-info">
                  <h2>{course.name}</h2>
                  <p>
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {course.dueDate || "N/A"}
                  </p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </Link>
              <button
                className="complete-course-btn"
                onClick={() => handleMarkAsCompleted(course.id)}
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
