export const EMPLOYEE_STATUS = Object.freeze({
  ACTIVE: 'Attivo',
  INACTIVE: 'Inattivo',
});

export const STATUS_OPTIONS = [
  { value: EMPLOYEE_STATUS.ACTIVE, label: 'Attivo' },
  { value: EMPLOYEE_STATUS.INACTIVE, label: 'Inattivo' },
];

export const POSITION_OPTIONS = [
  { value: 'Safety manager', label: 'Safety manager' },
  { value: 'Operatore di produzione', label: 'Operatore di produzione' },
  { value: 'Responsabile HR', label: 'Responsabile HR' },
  { value: 'Tecnico di manutenzione', label: 'Tecnico di manutenzione' },
  { value: 'Amministrazione', label: 'Amministrazione' },
];

// Shared with CompanyCourseList so the employee list, the modal's "Assigned
// course" dropdown and the course catalog all read from a single source.
export const COURSE_OPTIONS = [
  {
    id: 'seveso',
    title: 'Formazione SEVESO',
    students: 20,
    image: '/images/course/course.png',
  },
  {
    id: 'generale',
    title: 'Formazione generale',
    students: 15,
    image: '/images/course/catalog4.png',
  },
  {
    id: 'password',
    title: 'Sicurezza della Password',
    students: 15,
    image: '/images/course/course3.png',
  },
];

export const getCourseById = (courseId) =>
  COURSE_OPTIONS.find((course) => course.id === courseId) || null;
