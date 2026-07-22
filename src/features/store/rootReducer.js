import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import contactReducer from '../public/contact/contactSlice';
import courseReducer from '../public/course/courseSlice';
import serviceRequestReducer from '../public/serviceRequest/serviceRequestSlice';
import privateReducer from '../private/privateSlice';
import reviewReducer from '../public/review/reviewSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  course: courseReducer,
  serviceRequest: serviceRequestReducer,
  private: privateReducer,
  review: reviewReducer,
});

export default rootReducer;
