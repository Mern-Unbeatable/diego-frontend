import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import contactReducer from '../public/contact/contactSlice';
import serviceRequestReducer from '../public/serviceRequest/serviceRequestSlice';
import privateReducer from '../private/privateSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  serviceRequest: serviceRequestReducer,
  private: privateReducer,
});

export default rootReducer;
