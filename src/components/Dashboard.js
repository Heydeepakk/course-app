// src/components/Dashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeCourse } from '../redux/courseSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.course.enrolledCourses);

  const handleComplete = (courseId) => {
    dispatch(completeCourse(courseId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
            <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
            <p className="text-gray-600 mb-4">Due Date: {course.dueDate}</p>
            <div className="relative pt-1 mb-4">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${course.completed ? 100 : 50}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
              <span className="text-sm font-medium">{course.completed ? 'Completed' : 'In Progress'}</span>
            </div>
            {!course.completed && (
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => handleComplete(course.id)}
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
