import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { baseApi } from '../api/baseApi';
import '../api/planApi';
import '../api/licenseApi';
import '../api/courseApi';
import '../api/dashboardApi';
import '../api/ticketApi';
import '../api/reviewApi';
import '../api/staffApi';
import '../api/licenseUserApi';
import '../api/coursePackageApi';
import '../api/inquiryApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
