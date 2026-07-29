import { baseApi } from './baseApi';
import { endpoints } from '../../config/api/httpEndpoint';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapLicenseeStudentDetailResponse,
  mapLicenseeStudentsResponse,
} from './enrollmentMappers';
import { axiosInstance } from '../../config/api/client';

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

    uploadParticipantSignature: builder.mutation({
      queryFn: async ({ enrollmentId, file }, _api, _extraOptions, baseQuery) => {
        try {
          const formData = new FormData();
          formData.append('signature', file);
          const response = await axiosInstance.post(
            endpoints.enrollment.PARTICIPANT_SIGNATURE(enrollmentId),
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
          );
          if (response.status >= 400) {
            return {
              error: transformErrorResponse(response, 'Signature upload failed'),
            };
          }
          return { data: unwrapApiData(response.data) };
        } catch (error) {
          return { error: transformErrorResponse(error, 'Signature upload failed') };
        }
      },
      invalidatesTags: (_result, _error, { studentId }) =>
        studentId ? [{ type: 'Enrollment', id: `STUDENT-${studentId}` }] : [],
    }),

    confirmTrainingReport: builder.mutation({
      query: ({ enrollmentId }) => ({
        url: endpoints.enrollment.CONFIRM_TRAINING_REPORT(enrollmentId),
        method: 'PATCH',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { studentId }) =>
        studentId ? [{ type: 'Enrollment', id: `STUDENT-${studentId}` }] : [],
    }),
  }),
});

export const {
  useGetLicenseeStudentsQuery,
  useGetLicenseeStudentDetailQuery,
  useLazyGetLicenseeStudentDetailQuery,
  useUploadParticipantSignatureMutation,
  useConfirmTrainingReportMutation,
} = enrollmentApi;

export default enrollmentApi;
