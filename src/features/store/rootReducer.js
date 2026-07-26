import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import contactReducer from '../public/contact/contactSlice';
import courseReducer from '../public/course/courseSlice';
import serviceRequestReducer from '../public/serviceRequest/serviceRequestSlice';
import privateReducer from '../private/privateSlice';
import reviewReducer from '../public/review/reviewSlice';
import paymentReducer from '../public/payment/paymentSlice';
import employeeReducer from '../company/employee/employeeSlice';
import adminReducer from '../admin/adminSlice';
import { baseApi } from '../api/baseApi';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  course: courseReducer,
  serviceRequest: serviceRequestReducer,
  private: privateReducer,
  review: reviewReducer,
  payment: paymentReducer,
  employee: employeeReducer,
  admin: adminReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
