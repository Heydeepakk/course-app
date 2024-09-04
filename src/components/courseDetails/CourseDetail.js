import React, { useState, useEffect } from "react";
import { db, doc, getDoc, updateDoc } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToEnrollmentList,
  selectEnrollmentList,
} from "../../redux/enrollmentSlice.js";
import "./CourseDetails.css";
import Header from "../Header/Header.js";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const dispatch = useDispatch();
  const enrollmentList = useSelector(selectEnrollmentList);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDoc = doc(db, "courses", id);
        const courseSnapshot = await getDoc(courseDoc);
        if (courseSnapshot.exists()) {
          setCourse({ id, ...courseSnapshot.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const courseDoc = doc(db, "courses", id);
      await updateDoc(courseDoc, { enrollmentStatus: "Open" });
      setCourse((prevCourse) => ({ ...prevCourse, enrollmentStatus: "Open" }));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleAddToList = () => {
    if (course && !enrollmentList.find((c) => c.id === course.id)) {
      dispatch(addToEnrollmentList(course));
    }
  };

  if (!course) return <p>Loading...</p>;

  const isCourseInCart = enrollmentList.find((c) => c.id === course.id);

  return (
    <div>
      <Header buttonText="Enrolled List" buttonLink="/" />

      <div className="course-details-container">
        <h1 className="course-title">{course.name}</h1>
        <div className="course-details-box">
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Description:</strong> {course.description}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Enrollment Status:</strong> {course.enrollmentStatus}
          </p>
          <p>
            <strong>Schedule:</strong> {course.schedule}
          </p>
          <p>
            <strong>Location:</strong> {course.location}
          </p>
          <div className="course-prerequisites">
            <strong>Prerequisites:</strong>
            <ul>
              {course.prerequisites.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="course-syllabus">
            <strong>Syllabus:</strong>
            <ul>
              {course.syllabus.map((item, index) => {
                const { week, topic, content } = JSON.parse(item);
                return (
                  <li key={index}>
                    <p>
                      <strong>Week {week}:</strong> {topic}
                    </p>
                    <p>{content}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          {course.enrollmentStatus !== "Open" && (
            <button className="enroll-button" onClick={handleEnroll}>
              Enroll the Course
            </button>
          )}
          <button
            className="enroll-button"
            onClick={handleAddToList}
            disabled={isCourseInCart}
          >
            {isCourseInCart
              ? "Added to Enrollment List"
              : "Add to Enrollment List"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
