import { createSlice } from "@reduxjs/toolkit";

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: [],
  reducers: {
    addToEnrollmentList: (state, action) => {
      const isAlreadyEnrolled = state.find(
        (course) => course.id === action.payload.id
      );
      if (!isAlreadyEnrolled) {
        state.push(action.payload);
      }
    },
    removeFromEnrollmentList: (state, action) => {
      return state.filter((course) => course.id !== action.payload);
    },
    clearEnrollmentList: () => [],
    enrollAllCourses: (state) => {
      return state.map((course) => ({
        ...course,
        enrollmentStatus: "Open",
      }));
    },
  },
});

export const {
  addToEnrollmentList,
  removeFromEnrollmentList,
  clearEnrollmentList,
  enrollAllCourses,
} = enrollmentSlice.actions;

export const selectEnrollmentList = (state) => state.enrollment;
export const selectEnrollmentCount = (state) => state.enrollment.length;

export default enrollmentSlice.reducer;
