import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { getCourseDetailsService, getPublicCoursesService } from './courseService';

export const getPublicCoursesAPI = createAsyncThunk(
  'course/getPublicCourses',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getPublicCoursesService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getCourseDetailsAPI = createAsyncThunk(
  'course/getCourseDetails',
  async (courseId, { rejectWithValue, signal }) => {
    try {
      return await getCourseDetailsService(courseId, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
