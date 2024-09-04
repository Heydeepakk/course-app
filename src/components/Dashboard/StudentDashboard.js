import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
} from "../../firebaseConfig";
import "./StudentDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import ProgressBar from "react-bootstrap/ProgressBar";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Real-time listener for alll courses
    const unsubscribe = onSnapshot(collection(db, "courses"), (snapshot) => {
      const courseList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    });

    return () => unsubscribe();
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
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  const handleLike = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div>
      <Header buttonText="Course List" buttonLink="/course" />
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
                </div>
              </Link>
              <ProgressBar
                className="progressbar"
                now={course.progress}
                label={`${course.progress}%`}
              />

              <button
                className="complete-course-btn"
                onClick={() => handleMarkAsCompleted(course.id)}
              >
                Mark as Completed
              </button>
              {course.enrollmentStatus === "Open" && (
                <button
                  className="like-course-btn"
                  onClick={() => handleLike(course.id)}
                >
                  🎁 Like ({course.likes})
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
