import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { employeeService } from './employeeService';

export const fetchEmployeesAPI = createAsyncThunk(
  'employee/fetchAll',
  async (params, { rejectWithValue, signal }) => {
    try {
      return await employeeService.getEmployees(params, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchEmployeeByIdAPI = createAsyncThunk(
  'employee/fetchById',
  async (id, { rejectWithValue, signal }) => {
    try {
      return await employeeService.getEmployeeById(id, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createEmployeeAPI = createAsyncThunk(
  'employee/create',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await employeeService.createEmployee(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateEmployeeAPI = createAsyncThunk(
  'employee/update',
  async ({ userId, payload }, { rejectWithValue, signal }) => {
    try {
      return await employeeService.updateEmployee(userId, payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deleteEmployeeAPI = createAsyncThunk(
  'employee/delete',
  async (userId, { rejectWithValue, signal }) => {
    try {
      return await employeeService.deleteEmployee(userId, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
