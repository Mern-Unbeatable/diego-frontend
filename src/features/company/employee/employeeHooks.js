import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployeesAPI,
  fetchEmployeeByIdAPI,
  createEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from './employeeAPI';
import { resetEmployeeError, setEmployeePage } from './employeeSlice';
import {
  selectEmployees,
  selectEmployeesLoading,
  selectEmployeesMutating,
  selectEmployeesError,
  selectEmployeesPagination,
} from './employeeSelectors';

/**
 * Single entry point for the employee feature. Pages/modals should only
 * ever talk to the store through this hook — never dispatch employeeAPI
 * thunks directly from components.
 */
export const useEmployees = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectEmployeesLoading);
  const mutating = useSelector(selectEmployeesMutating);
  const error = useSelector(selectEmployeesError);
  const { page, pageSize, total, totalPages } = useSelector(
    selectEmployeesPagination,
  );

  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const fetchEmployees = useCallback(
    (targetPage = pageRef.current, params = {}) =>
      dispatch(
        fetchEmployeesAPI({ page: targetPage, pageSize, ...params }),
      ).unwrap(),
    [dispatch, pageSize],
  );

  const setPage = useCallback(
    (targetPage) => {
      dispatch(setEmployeePage(targetPage));
      return fetchEmployees(targetPage);
    },
    [dispatch, fetchEmployees],
  );

  const createEmployee = useCallback(
    async (payload) => {
      const created = await dispatch(createEmployeeAPI(payload)).unwrap();
      await fetchEmployees(pageRef.current);
      return created;
    },
    [dispatch, fetchEmployees],
  );

  const updateEmployee = useCallback(
    async (userId, payload) => {
      const updated = await dispatch(
        updateEmployeeAPI({ userId, payload }),
      ).unwrap();
      await fetchEmployees(pageRef.current);
      return updated;
    },
    [dispatch, fetchEmployees],
  );

  const deleteEmployee = useCallback(
    async (userId) => {
      await dispatch(deleteEmployeeAPI(userId)).unwrap();
      await fetchEmployees(pageRef.current);
    },
    [dispatch, fetchEmployees],
  );

  const getEmployeeById = useCallback(
    (id) => dispatch(fetchEmployeeByIdAPI(id)).unwrap(),
    [dispatch],
  );

  const resetError = useCallback(
    () => dispatch(resetEmployeeError()),
    [dispatch],
  );

  return {
    employees,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    mutating,
    error,
    fetchEmployees,
    setPage,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    resetError,
  };
};
