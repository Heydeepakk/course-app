import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearEnrollmentList,
  removeFromEnrollmentList,
} from "../../redux/enrollmentSlice.js";
import { db, doc, updateDoc } from "../../firebaseConfig";
import "./EnrollmentCart.css";
import Header from "../Header/Header.js";

const EnrollmentCart = () => {
  const cart = useSelector((state) => state.enrollment);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleEnrollAll = async () => {
    try {
      await Promise.all(
        cart.map(async (course) => {
          const courseDoc = doc(db, "courses", course.id);
          await updateDoc(courseDoc, { enrollmentStatus: "Open" });
        })
      );
      dispatch(clearEnrollmentList());
      setMessage("All courses have been successfully enrolled!");
    } catch (error) {
      console.error("Error enrolling courses:", error);
      setMessage("An error occurred while enrolling courses.");
    }
  };

  const handleRemoveCourse = (courseId) => {
    dispatch(removeFromEnrollmentList(courseId));
  };

  return (
    <div>
      <Header buttonText="Course List" buttonLink="/course" />
      <div className="enrollment-cart">
        <h1>Enrollment Cart</h1>
        {message && <p className="enrollment-message">{message}</p>}
        <ul className="cart-list">
          {cart.map((course) => (
            <li key={course.id} className="cart-item">
              <div className="course-info">
                <p>
                  <strong>{course.name}</strong>
                </p>
                <p>Instructor: {course.instructor}</p>
                <p>Description: {course.description}</p>
              </div>
              <button
                className="remove-course-button"
                onClick={() => handleRemoveCourse(course.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {cart.length > 0 ? (
          <button className="enroll-all-button" onClick={handleEnrollAll}>
            Enroll All Courses
          </button>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default EnrollmentCart;
