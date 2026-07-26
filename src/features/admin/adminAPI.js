import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../config/api/errorHandler';
import {
  getPlatformDashboardService,
  getEmergencyControlsService,
  updateEmergencyControlsService,
  getLicensesService,
  createLicenseService,
  updateLicenseService,
  deleteLicenseService,
  getLicensePlansService,
  createLicensePlanService,
  updateLicensePlanService,
  createCourseService,
  createLessonService,
  createQuizService,
  publishQuizService,
  createCourseWithContentService,
  createCourseOnlyService,
  createLessonsForCourseService,
  createQuizForCourseService,
  saveQuizForCourseService,
  updateQuizService,
} from './adminService';

export const getPlatformDashboardAPI = createAsyncThunk(
  'admin/getPlatformDashboard',
  async ({ periodDays = 30 } = {}, { rejectWithValue, signal }) => {
    try {
      return await getPlatformDashboardService({ periodDays, signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getEmergencyControlsAPI = createAsyncThunk(
  'admin/getEmergencyControls',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getEmergencyControlsService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateEmergencyControlsAPI = createAsyncThunk(
  'admin/updateEmergencyControls',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await updateEmergencyControlsService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getLicensesAPI = createAsyncThunk(
  'admin/getLicenses',
  async (params = {}, { rejectWithValue, signal }) => {
    try {
      return await getLicensesService(params, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createLicenseAPI = createAsyncThunk(
  'admin/createLicense',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createLicenseService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateLicenseAPI = createAsyncThunk(
  'admin/updateLicense',
  async ({ userId, payload }, { rejectWithValue, signal }) => {
    try {
      return await updateLicenseService(userId, payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deleteLicenseAPI = createAsyncThunk(
  'admin/deleteLicense',
  async (userId, { rejectWithValue, signal }) => {
    try {
      return await deleteLicenseService(userId, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getLicensePlansAPI = createAsyncThunk(
  'admin/getLicensePlans',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getLicensePlansService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createLicensePlanAPI = createAsyncThunk(
  'admin/createLicensePlan',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createLicensePlanService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateLicensePlanAPI = createAsyncThunk(
  'admin/updateLicensePlan',
  async ({ planId, payload }, { rejectWithValue, signal }) => {
    try {
      return await updateLicensePlanService(planId, payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createCourseAPI = createAsyncThunk(
  'admin/createCourse',
  async ({ payload, files }, { rejectWithValue, signal }) => {
    try {
      return await createCourseService({ payload, files }, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createQuizAPI = createAsyncThunk(
  'admin/createQuiz',
  async ({ courseId, payload }, { rejectWithValue, signal }) => {
    try {
      return await createQuizService(courseId, payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createCourseWithContentAPI = createAsyncThunk(
  'admin/createCourseWithContent',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createCourseWithContentService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createCourseOnlyAPI = createAsyncThunk(
  'admin/createCourseOnly',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createCourseOnlyService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createLessonsForCourseAPI = createAsyncThunk(
  'admin/createLessonsForCourse',
  async ({ courseId, lessons }, { rejectWithValue, signal }) => {
    try {
      return await createLessonsForCourseService(courseId, lessons, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const saveQuizForCourseAPI = createAsyncThunk(
  'admin/saveQuizForCourse',
  async ({ courseId, quizData }, { rejectWithValue, signal }) => {
    try {
      return await saveQuizForCourseService(courseId, quizData, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createQuizForCourseAPI = saveQuizForCourseAPI;

export const publishQuizAPI = createAsyncThunk(
  'admin/publishQuiz',
  async ({ quizId, isPublished = true }, { rejectWithValue, signal }) => {
    try {
      return await publishQuizService(quizId, isPublished, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
