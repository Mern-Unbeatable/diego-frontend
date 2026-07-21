import { createSlice } from '@reduxjs/toolkit';
import { getCourseDetailsAPI, getPublicCoursesAPI } from './courseAPI';

const initialState = {
  loading: false,
  error: null,
  courses: [],
  meta: null,
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicCoursesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicCoursesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload?.data?.courses || [];
        state.meta = action.payload?.data?.meta || null;
      })
      .addCase(getPublicCoursesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCourseDetailsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseDetailsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload?.data?.course || null;
      })
      .addCase(getCourseDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCourseError } = courseSlice.actions;
export default courseSlice.reducer;
