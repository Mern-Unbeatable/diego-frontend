import { createSlice } from '@reduxjs/toolkit';
import {
  getPlatformDashboardAPI,
  getEmergencyControlsAPI,
  updateEmergencyControlsAPI,
  getLicensesAPI,
  createLicenseAPI,
  updateLicenseAPI,
  deleteLicenseAPI,
  getLicensePlansAPI,
  createLicensePlanAPI,
  updateLicensePlanAPI,
  createCourseAPI,
  createQuizAPI,
  publishQuizAPI,
  createCourseWithContentAPI,
  createCourseOnlyAPI,
  createLessonsForCourseAPI,
  saveQuizForCourseAPI,
} from './adminAPI';
import {
  mapDashboardResponse,
  mapEmergencyControlsResponse,
  mapLicensesResponse,
  mapLicensePlansResponse,
} from './adminMappers';

const initialState = {
  dashboard: null,
  dashboardLoading: false,
  dashboardError: null,
  emergencyControls: null,
  emergencyControlsLoading: false,
  emergencyControlsError: null,
  emergencyControlsSaving: false,
  licenses: [],
  licensesMeta: { page: 1, limit: 20, total: 0, totalPages: 1 },
  licensesLoading: false,
  licensesError: null,
  licensePlans: [],
  licensePlansLoading: false,
  licensePlansError: null,
  saveLicensePlanLoading: false,
  saveLicensePlanError: null,
  createLicenseLoading: false,
  createLicenseError: null,
  updateLicenseLoading: false,
  updateLicenseError: null,
  deleteLicenseLoading: false,
  deleteLicenseError: null,
  createCourseLoading: false,
  createCourseError: null,
  createLessonsLoading: false,
  createLessonsError: null,
  createQuizLoading: false,
  createQuizError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminError: (state) => {
      state.dashboardError = null;
      state.emergencyControlsError = null;
      state.licensesError = null;
      state.licensePlansError = null;
      state.createLicenseError = null;
      state.updateLicenseError = null;
      state.deleteLicenseError = null;
      state.createCourseError = null;
      state.createLessonsError = null;
      state.createQuizError = null;
      state.saveLicensePlanError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlatformDashboardAPI.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(getPlatformDashboardAPI.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = mapDashboardResponse(action.payload);
      })
      .addCase(getPlatformDashboardAPI.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload;
      })
      .addCase(getEmergencyControlsAPI.pending, (state) => {
        state.emergencyControlsLoading = true;
        state.emergencyControlsError = null;
      })
      .addCase(getEmergencyControlsAPI.fulfilled, (state, action) => {
        state.emergencyControlsLoading = false;
        state.emergencyControls = mapEmergencyControlsResponse(action.payload);
      })
      .addCase(getEmergencyControlsAPI.rejected, (state, action) => {
        state.emergencyControlsLoading = false;
        state.emergencyControlsError = action.payload;
      })
      .addCase(updateEmergencyControlsAPI.pending, (state) => {
        state.emergencyControlsSaving = true;
        state.emergencyControlsError = null;
      })
      .addCase(updateEmergencyControlsAPI.fulfilled, (state, action) => {
        state.emergencyControlsSaving = false;
        state.emergencyControls = mapEmergencyControlsResponse(action.payload);
      })
      .addCase(updateEmergencyControlsAPI.rejected, (state, action) => {
        state.emergencyControlsSaving = false;
        state.emergencyControlsError = action.payload;
      })
      .addCase(getLicensesAPI.pending, (state) => {
        state.licensesLoading = true;
        state.licensesError = null;
      })
      .addCase(getLicensesAPI.fulfilled, (state, action) => {
        state.licensesLoading = false;
        const mapped = mapLicensesResponse(action.payload);
        state.licenses = mapped.licenses;
        state.licensesMeta = mapped.meta;
      })
      .addCase(getLicensesAPI.rejected, (state, action) => {
        state.licensesLoading = false;
        state.licensesError = action.payload;
      })
      .addCase(getLicensePlansAPI.pending, (state) => {
        state.licensePlansLoading = true;
        state.licensePlansError = null;
      })
      .addCase(getLicensePlansAPI.fulfilled, (state, action) => {
        state.licensePlansLoading = false;
        state.licensePlans = mapLicensePlansResponse(action.payload);
      })
      .addCase(getLicensePlansAPI.rejected, (state, action) => {
        state.licensePlansLoading = false;
        state.licensePlansError = action.payload;
      })
      .addCase(createLicensePlanAPI.pending, (state) => {
        state.saveLicensePlanLoading = true;
        state.saveLicensePlanError = null;
      })
      .addCase(createLicensePlanAPI.fulfilled, (state) => {
        state.saveLicensePlanLoading = false;
      })
      .addCase(createLicensePlanAPI.rejected, (state, action) => {
        state.saveLicensePlanLoading = false;
        state.saveLicensePlanError = action.payload;
      })
      .addCase(updateLicensePlanAPI.pending, (state) => {
        state.saveLicensePlanLoading = true;
        state.saveLicensePlanError = null;
      })
      .addCase(updateLicensePlanAPI.fulfilled, (state) => {
        state.saveLicensePlanLoading = false;
      })
      .addCase(updateLicensePlanAPI.rejected, (state, action) => {
        state.saveLicensePlanLoading = false;
        state.saveLicensePlanError = action.payload;
      })
      .addCase(createLicenseAPI.pending, (state) => {
        state.createLicenseLoading = true;
        state.createLicenseError = null;
      })
      .addCase(createLicenseAPI.fulfilled, (state) => {
        state.createLicenseLoading = false;
      })
      .addCase(createLicenseAPI.rejected, (state, action) => {
        state.createLicenseLoading = false;
        state.createLicenseError = action.payload;
      })
      .addCase(updateLicenseAPI.pending, (state) => {
        state.updateLicenseLoading = true;
        state.updateLicenseError = null;
      })
      .addCase(updateLicenseAPI.fulfilled, (state) => {
        state.updateLicenseLoading = false;
      })
      .addCase(updateLicenseAPI.rejected, (state, action) => {
        state.updateLicenseLoading = false;
        state.updateLicenseError = action.payload;
      })
      .addCase(deleteLicenseAPI.pending, (state) => {
        state.deleteLicenseLoading = true;
        state.deleteLicenseError = null;
      })
      .addCase(deleteLicenseAPI.fulfilled, (state) => {
        state.deleteLicenseLoading = false;
      })
      .addCase(deleteLicenseAPI.rejected, (state, action) => {
        state.deleteLicenseLoading = false;
        state.deleteLicenseError = action.payload;
      })
      .addCase(createCourseAPI.pending, (state) => {
        state.createCourseLoading = true;
        state.createCourseError = null;
      })
      .addCase(createCourseAPI.fulfilled, (state) => {
        state.createCourseLoading = false;
      })
      .addCase(createCourseAPI.rejected, (state, action) => {
        state.createCourseLoading = false;
        state.createCourseError = action.payload;
      })
      .addCase(createQuizAPI.pending, (state) => {
        state.createQuizLoading = true;
        state.createQuizError = null;
      })
      .addCase(createQuizAPI.fulfilled, (state) => {
        state.createQuizLoading = false;
      })
      .addCase(createQuizAPI.rejected, (state, action) => {
        state.createQuizLoading = false;
        state.createQuizError = action.payload;
      })
      .addCase(createCourseWithContentAPI.pending, (state) => {
        state.createCourseLoading = true;
        state.createCourseError = null;
        state.createQuizLoading = true;
        state.createQuizError = null;
      })
      .addCase(createCourseWithContentAPI.fulfilled, (state) => {
        state.createCourseLoading = false;
        state.createQuizLoading = false;
      })
      .addCase(createCourseWithContentAPI.rejected, (state, action) => {
        state.createCourseLoading = false;
        state.createQuizLoading = false;
        state.createCourseError = action.payload;
        state.createQuizError = action.payload;
      })
      .addCase(createCourseOnlyAPI.pending, (state) => {
        state.createCourseLoading = true;
        state.createCourseError = null;
        state.createQuizLoading = true;
        state.createQuizError = null;
      })
      .addCase(createCourseOnlyAPI.fulfilled, (state) => {
        state.createCourseLoading = false;
        state.createQuizLoading = false;
      })
      .addCase(createCourseOnlyAPI.rejected, (state, action) => {
        state.createCourseLoading = false;
        state.createQuizLoading = false;
        state.createCourseError = action.payload;
        state.createQuizError = action.payload;
      })
      .addCase(createLessonsForCourseAPI.pending, (state) => {
        state.createLessonsLoading = true;
        state.createLessonsError = null;
      })
      .addCase(createLessonsForCourseAPI.fulfilled, (state) => {
        state.createLessonsLoading = false;
      })
      .addCase(createLessonsForCourseAPI.rejected, (state, action) => {
        state.createLessonsLoading = false;
        state.createLessonsError = action.payload;
      })
      .addCase(saveQuizForCourseAPI.pending, (state) => {
        state.createQuizLoading = true;
        state.createQuizError = null;
      })
      .addCase(saveQuizForCourseAPI.fulfilled, (state) => {
        state.createQuizLoading = false;
      })
      .addCase(saveQuizForCourseAPI.rejected, (state, action) => {
        state.createQuizLoading = false;
        state.createQuizError = action.payload;
      });
  },
});

export const { resetAdminError } = adminSlice.actions;
export default adminSlice.reducer;
