/**
 * Employee service layer.
 *
 * Shaped exactly like the real-backend services in this codebase
 * (see contactService.js): every function is async and returns the same
 * payload a real endpoint would. Today it delegates to the in-memory mock
 * (`employeeMockDb.js`); swapping to a real backend later only means
 * replacing the bodies below with `request({ method, url, data, signal })`
 * calls against `endpoints.company.employees...`.
 */

import {
  simulateDelay,
  dbListEmployees,
  dbGetEmployeeById,
  dbCreateEmployee,
  dbUpdateEmployee,
  dbDeleteEmployee,
} from './employeeMockDb';

export const getEmployees = async (params = {}, { signal } = {}) => {
  await simulateDelay();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return dbListEmployees(params);
};

export const getEmployeeById = async (id, { signal } = {}) => {
  await simulateDelay();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return dbGetEmployeeById(id);
};

export const createEmployee = async (payload, { signal } = {}) => {
  await simulateDelay();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return dbCreateEmployee(payload);
};

export const updateEmployee = async (id, payload, { signal } = {}) => {
  await simulateDelay();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return dbUpdateEmployee(id, payload);
};

export const deleteEmployee = async (id, { signal } = {}) => {
  await simulateDelay();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return dbDeleteEmployee(id);
};

export const employeeService = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
