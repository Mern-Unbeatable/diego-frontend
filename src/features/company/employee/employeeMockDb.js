/**
 * In-memory mock "database" for employees.
 *
 * This module is the ONLY place that knows data lives in memory. It mimics
 * the shape a real backend would return (paginated list, single record,
 * created/updated record) so that `employeeService.js` can later be pointed
 * at `request()` + a real endpoint without any change to the Redux layer.
 */

import { EMPLOYEE_STATUS } from './employeeConstants';

const NETWORK_DELAY_MS = 450;

let idCounter = 100;
const nextId = () => idCounter++;

let employees = [
  {
    id: 1,
    firstName: 'Franco',
    lastName: 'Rossi',
    email: 'willie.jennings@example.com',
    phone: '+39 123 456 7890',
    position: 'Safety manager',
    hireDate: '2022-03-15',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'seveso',
  },
  {
    id: 2,
    firstName: 'Michelle',
    lastName: 'Rivera',
    email: 'michelle.rivera@example.com',
    phone: '+39 123 456 7891',
    position: 'Safety manager',
    hireDate: '2022-03-15',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'seveso',
  },
  {
    id: 3,
    firstName: 'Alma',
    lastName: 'Lawson',
    email: 'alma.lawson@example.com',
    phone: '+39 123 456 7892',
    position: 'Operatore di produzione',
    hireDate: '2021-11-02',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'generale',
  },
  {
    id: 4,
    firstName: 'Curtis',
    lastName: 'Weaver',
    email: 'curtis.weaver@example.com',
    phone: '+39 123 456 7893',
    position: 'Tecnico di manutenzione',
    hireDate: '2020-06-18',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'generale',
  },
  {
    id: 5,
    firstName: 'Kenzi',
    lastName: 'Lawson',
    email: 'kenzi.lawson@example.com',
    phone: '+39 123 456 7894',
    position: 'Responsabile HR',
    hireDate: '2023-01-09',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'password',
  },
  {
    id: 6,
    firstName: 'Georgia',
    lastName: 'Young',
    email: 'georgia.young@example.com',
    phone: '+39 123 456 7895',
    position: 'Safety manager',
    hireDate: '2019-09-23',
    status: EMPLOYEE_STATUS.INACTIVE,
    assignedCourseId: null,
  },
  {
    id: 7,
    firstName: 'Willie',
    lastName: 'Jennings',
    email: 'willie.j@example.com',
    phone: '+39 123 456 7896',
    position: 'Amministrazione',
    hireDate: '2022-08-30',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'generale',
  },
  {
    id: 8,
    firstName: 'Savannah',
    lastName: 'Nguyen',
    email: 'savannah.nguyen@example.com',
    phone: '+39 123 456 7897',
    position: 'Operatore di produzione',
    hireDate: '2021-04-12',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'seveso',
  },
  {
    id: 9,
    firstName: 'Cody',
    lastName: 'Fisher',
    email: 'cody.fisher@example.com',
    phone: '+39 123 456 7898',
    position: 'Tecnico di manutenzione',
    hireDate: '2020-02-27',
    status: EMPLOYEE_STATUS.INACTIVE,
    assignedCourseId: null,
  },
  {
    id: 10,
    firstName: 'Leslie',
    lastName: 'Alexander',
    email: 'leslie.alexander@example.com',
    phone: '+39 123 456 7899',
    position: 'Responsabile HR',
    hireDate: '2023-05-05',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'password',
  },
  {
    id: 11,
    firstName: 'Guy',
    lastName: 'Hawkins',
    email: 'guy.hawkins@example.com',
    phone: '+39 123 456 7800',
    position: 'Safety manager',
    hireDate: '2018-12-01',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'seveso',
  },
  {
    id: 12,
    firstName: 'Theresa',
    lastName: 'Webb',
    email: 'theresa.webb@example.com',
    phone: '+39 123 456 7801',
    position: 'Amministrazione',
    hireDate: '2022-10-14',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: null,
  },
  {
    id: 13,
    firstName: 'Kristin',
    lastName: 'Watson',
    email: 'kristin.watson@example.com',
    phone: '+39 123 456 7802',
    position: 'Operatore di produzione',
    hireDate: '2021-07-19',
    status: EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: 'generale',
  },
  {
    id: 14,
    firstName: 'Jerome',
    lastName: 'Bell',
    email: 'jerome.bell@example.com',
    phone: '+39 123 456 7803',
    position: 'Tecnico di manutenzione',
    hireDate: '2019-03-03',
    status: EMPLOYEE_STATUS.INACTIVE,
    assignedCourseId: null,
  },
];

export const simulateDelay = (ms = NETWORK_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const clone = (record) => (record ? { ...record } : record);

export const dbListEmployees = ({ page = 1, pageSize = 6, search = '' } = {}) => {
  const needle = search.trim().toLowerCase();

  const filtered = needle
    ? employees.filter((employee) =>
        [employee.firstName, employee.lastName, employee.email, employee.position]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(needle)),
      )
    : employees;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize).map(clone);

  return { items, total, page: safePage, pageSize, totalPages };
};

export const dbGetEmployeeById = (id) => {
  const record = employees.find((employee) => String(employee.id) === String(id));
  if (!record) {
    const error = new Error('Employee not found');
    error.status = 404;
    throw error;
  }
  return clone(record);
};

export const dbCreateEmployee = (payload) => {
  const record = {
    id: nextId(),
    firstName: payload.firstName?.trim() || '',
    lastName: payload.lastName?.trim() || '',
    email: payload.email?.trim() || '',
    phone: payload.phone?.trim() || '',
    position: payload.position || '',
    hireDate: payload.hireDate || '',
    status: payload.status || EMPLOYEE_STATUS.ACTIVE,
    assignedCourseId: payload.assignedCourseId || null,
  };
  employees = [record, ...employees];
  return clone(record);
};

export const dbUpdateEmployee = (id, payload) => {
  // Never persist/echo back the password, exactly like a real backend never
  // returns credentials in a response body.
  const { password: _password, ...safePayload } = payload;

  let updated = null;
  employees = employees.map((employee) => {
    if (String(employee.id) !== String(id)) return employee;
    updated = {
      ...employee,
      ...safePayload,
      id: employee.id,
    };
    return updated;
  });

  if (!updated) {
    const error = new Error('Employee not found');
    error.status = 404;
    throw error;
  }

  return clone(updated);
};

export const dbDeleteEmployee = (id) => {
  const exists = employees.some((employee) => String(employee.id) === String(id));
  if (!exists) {
    const error = new Error('Employee not found');
    error.status = 404;
    throw error;
  }
  employees = employees.filter((employee) => String(employee.id) !== String(id));
  return { id };
};
