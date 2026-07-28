import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { selectAdmin } from './adminSelectors';

export const useAdmin = () => {
  const dispatch = useDispatch();
  const adminState = useSelector(selectAdmin);

  const fetchDashboard = useCallback(
    async (params = {}) => dispatch(getPlatformDashboardAPI(params)).unwrap(),
    [dispatch],
  );

  const fetchEmergencyControls = useCallback(
    async () => dispatch(getEmergencyControlsAPI()).unwrap(),
    [dispatch],
  );

  const saveEmergencyControl = useCallback(
    async (payload) => dispatch(updateEmergencyControlsAPI(payload)).unwrap(),
    [dispatch],
  );

  const fetchLicenses = useCallback(
    async (params = {}) => dispatch(getLicensesAPI(params)).unwrap(),
    [dispatch],
  );

  const fetchLicensePlans = useCallback(
    async () => dispatch(getLicensePlansAPI()).unwrap(),
    [dispatch],
  );

  const createLicensePlan = useCallback(
    async (payload) => {
      const result = await dispatch(createLicensePlanAPI(payload)).unwrap();
      await dispatch(getLicensePlansAPI()).unwrap();
      return result;
    },
    [dispatch],
  );

  const updateLicensePlan = useCallback(
    async (planId, payload) => {
      const result = await dispatch(updateLicensePlanAPI({ planId, payload })).unwrap();
      await dispatch(getLicensePlansAPI()).unwrap();
      return result;
    },
    [dispatch],
  );

  const createLicense = useCallback(
    async (payload) => dispatch(createLicenseAPI(payload)).unwrap(),
    [dispatch],
  );

  const updateLicense = useCallback(
    async (userId, payload) =>
      dispatch(updateLicenseAPI({ userId, payload })).unwrap(),
    [dispatch],
  );

  const deleteLicense = useCallback(
    async (userId) => dispatch(deleteLicenseAPI(userId)).unwrap(),
    [dispatch],
  );

  const createCourse = useCallback(
    async ({ payload, files }) =>
      dispatch(createCourseAPI({ payload, files })).unwrap(),
    [dispatch],
  );

  const createQuiz = useCallback(
    async (courseId, payload) =>
      dispatch(createQuizAPI({ courseId, payload })).unwrap(),
    [dispatch],
  );

  const createCourseWithContent = useCallback(
    async (payload) =>
      dispatch(createCourseWithContentAPI(payload)).unwrap(),
    [dispatch],
  );

  const createCourseOnly = useCallback(
    async (payload) => dispatch(createCourseOnlyAPI(payload)).unwrap(),
    [dispatch],
  );

  const createLessonsForCourse = useCallback(
    async (courseId, lessons) =>
      dispatch(createLessonsForCourseAPI({ courseId, lessons })).unwrap(),
    [dispatch],
  );

  const saveQuizForCourse = useCallback(
    async (courseId, quizData) =>
      dispatch(saveQuizForCourseAPI({ courseId, quizData })).unwrap(),
    [dispatch],
  );

  const createQuizForCourse = saveQuizForCourse;

  const publishQuiz = useCallback(
    async (quizId, isPublished = true) =>
      dispatch(publishQuizAPI({ quizId, isPublished })).unwrap(),
    [dispatch],
  );

  return {
    fetchDashboard,
    fetchEmergencyControls,
    saveEmergencyControl,
    fetchLicenses,
    fetchLicensePlans,
    createLicensePlan,
    updateLicensePlan,
    createLicense,
    updateLicense,
    deleteLicense,
    createCourse,
    createCourseWithContent,
    createCourseOnly,
    createLessonsForCourse,
    saveQuizForCourse,
    createQuizForCourse,
    createQuiz,
    publishQuiz,
    ...adminState,
  };
};
