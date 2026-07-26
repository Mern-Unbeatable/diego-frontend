import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEmployeesAPI,
  fetchEmployeeByIdAPI,
  createEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from './employeeAPI';

const initialState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 6,
  totalPages: 1,
  loading: false,
  mutating: false,
  error: null,
  selected: null,
  selectedLoading: false,
  selectedError: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeePage: (state, action) => {
      state.page = action.payload;
    },
    resetEmployeeError: (state) => {
      state.error = null;
    },
    clearSelectedEmployee: (state) => {
      state.selected = null;
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- list ----
      .addCase(fetchEmployeesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchEmployeesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- single record ----
      .addCase(fetchEmployeeByIdAPI.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(fetchEmployeeByIdAPI.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchEmployeeByIdAPI.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload;
      })

      // ---- create ----
      .addCase(createEmployeeAPI.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(createEmployeeAPI.fulfilled, (state, action) => {
        state.mutating = false;
        const employee = action.payload?.employee;
        if (!employee) return;
        state.items = [employee, ...state.items];
        state.total += 1;
      })
      .addCase(createEmployeeAPI.rejected, (state) => {
        state.mutating = false;
      })

      // ---- update ----
      .addCase(updateEmployeeAPI.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(updateEmployeeAPI.fulfilled, (state, action) => {
        state.mutating = false;
        const employee = action.payload?.employee;
        if (!employee) return;
        state.items = state.items.map((item) =>
          String(item.userId) === String(employee.userId) ? employee : item,
        );
      })
      .addCase(updateEmployeeAPI.rejected, (state) => {
        state.mutating = false;
      })

      // ---- delete ----
      .addCase(deleteEmployeeAPI.pending, (state, action) => {
        state.mutating = true;
        state.error = null;
        // Optimistic removal for an instant UI update.
        state.items = state.items.filter(
          (employee) => String(employee.userId) !== String(action.meta.arg),
        );
      })
      .addCase(deleteEmployeeAPI.fulfilled, (state) => {
        state.mutating = false;
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteEmployeeAPI.rejected, (state) => {
        state.mutating = false;
      });
  },
});

export const { setEmployeePage, resetEmployeeError, clearSelectedEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
