import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import contactReducer from '../public/contact/contactSlice';
import courseReducer from '../public/course/courseSlice';
import serviceRequestReducer from '../public/serviceRequest/serviceRequestSlice';
import employeeReducer from '../company/employee/employeeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  course: courseReducer,
  serviceRequest: serviceRequestReducer,
  employee: employeeReducer,
});

export default rootReducer;
