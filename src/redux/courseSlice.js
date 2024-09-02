import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  enrolledCourses: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    enrollCourse: (state, action) => {
      state.enrolledCourses.push(action.payload);
    },
    completeCourse: (state, action) => {
      const course = state.enrolledCourses.find(c => c.id === action.payload);
      if (course) course.completed = true;
    },
  },
});

export const { setCourses, enrollCourse, completeCourse } = courseSlice.actions;
export default courseSlice.reducer;
