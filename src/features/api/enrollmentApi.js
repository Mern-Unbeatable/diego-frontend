import { baseApi } from './baseApi';
import { endpoints } from '../../config/api/httpEndpoint';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapLicenseeStudentDetailResponse,
  mapLicenseeStudentsResponse,
} from './enrollmentMappers';

const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLicenseeStudents: builder.query({
      query: ({ page = 1, limit = 10, search, status, courseId } = {}) => ({
        url: endpoints.enrollment.LICENSEE_STUDENTS,
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
          ...(courseId ? { courseId } : {}),
        },
      }),
      transformResponse: (response) => mapLicenseeStudentsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.students?.length
          ? [
              ...result.students.map((student) => ({
                type: 'Enrollment',
                id: `STUDENT-${student.id}`,
              })),
              { type: 'Enrollment', id: 'STUDENTS_LIST' },
            ]
          : [{ type: 'Enrollment', id: 'STUDENTS_LIST' }],
    }),

    getLicenseeStudentDetail: builder.query({
      query: (studentId) => ({
        url: endpoints.enrollment.LICENSEE_STUDENT_DETAIL(studentId),
        method: 'GET',
      }),
      transformResponse: (response) => mapLicenseeStudentDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (_result, _error, studentId) => [
        { type: 'Enrollment', id: `STUDENT-${studentId}` },
      ],
    }),
  }),
});

export const {
  useGetLicenseeStudentsQuery,
  useGetLicenseeStudentDetailQuery,
  useLazyGetLicenseeStudentDetailQuery,
} = enrollmentApi;

export default enrollmentApi;
