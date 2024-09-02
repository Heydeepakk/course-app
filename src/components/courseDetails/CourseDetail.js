import React, { useState, useEffect } from 'react';
import { db, doc, getDoc } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDoc = doc(db, 'courses', id); 
        const courseSnapshot = await getDoc(courseDoc);
        if (courseSnapshot.exists()) {
          setCourse(courseSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-details-container">
      <h1 className="course-title">{course.name}</h1>
      <div className="course-details-box">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
        <p><strong>Schedule:</strong> {course.schedule}</p>
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
                  <p><strong>Week {week}:</strong> {topic}</p>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
