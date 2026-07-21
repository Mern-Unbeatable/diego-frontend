export const selectEmployeeState = (state) => state.employee;
export const selectEmployees = (state) => state.employee.items;
export const selectEmployeesLoading = (state) => state.employee.loading;
export const selectEmployeesMutating = (state) => state.employee.mutating;
export const selectEmployeesError = (state) => state.employee.error;
export const selectEmployeesPagination = (state) => ({
  page: state.employee.page,
  pageSize: state.employee.pageSize,
  total: state.employee.total,
  totalPages: state.employee.totalPages,
});
export const selectSelectedEmployee = (state) => state.employee.selected;
