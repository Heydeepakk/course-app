import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/courseList/CourseList';
import CourseDetails from './components/courseDetails/CourseDetail';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import EnrollmentCart from './components/Enrollment/EnrollmentCart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/course" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/enrollment-cart" element={<EnrollmentCart />} />
      </Routes>
    </Router>
  );
};

export default App;
