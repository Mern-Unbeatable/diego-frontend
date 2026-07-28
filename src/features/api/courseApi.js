import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params = {}) => ({
        url: '/courses',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: ['Course'],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: (_result, _error, courseId) => [{ type: 'Course', id: courseId }],
    }),

    createCourse: builder.mutation({
      query: (formData) => ({
        url: '/courses',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['Course', 'Dashboard', 'LicenseUserDashboard'],
    }),

    updateCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/courses/${courseId}`,
        method: 'PATCH',
        body: formData,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { courseId }) => [
        'Course',
        'Dashboard',
        'LicenseUserDashboard',
        { type: 'Course', id: courseId },
      ],
    }),

    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['Course', 'Dashboard', 'LicenseUserDashboard'],
    }),

    createLesson: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/courses/${courseId}/lessons`,
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { courseId }) => [
        'Lesson',
        'Course',
        { type: 'Lesson', id: `LIST-${courseId}` },
        { type: 'Course', id: courseId },
      ],
    }),

    getCourseLessons: builder.query({
      query: ({ courseId, ...params }) => ({
        url: `/courses/${courseId}/lessons`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: (result, error, { courseId }) => [
        { type: 'Lesson', id: `LIST-${courseId}` },
      ],
    }),

    getLessonById: builder.query({
      query: ({ courseId, lessonId }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: (result, error, { lessonId }) => [{ type: 'Lesson', id: lessonId }],
    }),

    updateLesson: builder.mutation({
      query: ({ courseId, lessonId, formData }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: 'PATCH',
        body: formData,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { courseId, lessonId }) => [
        'Lesson',
        'Course',
        { type: 'Lesson', id: `LIST-${courseId}` },
        { type: 'Lesson', id: lessonId },
        { type: 'Course', id: courseId },
      ],
    }),

    deleteLesson: builder.mutation({
      query: ({ courseId, lessonId }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { courseId, lessonId }) => [
        'Lesson',
        'Course',
        { type: 'Lesson', id: `LIST-${courseId}` },
        { type: 'Lesson', id: lessonId },
        { type: 'Course', id: courseId },
      ],
    }),

    createQuiz: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `/quizzes/${courseId}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['Quiz', 'Course'],
    }),

    updateQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/quizzes/${quizId}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['Quiz'],
    }),

    publishQuiz: builder.mutation({
      query: ({ quizId, isPublished = true }) => ({
        url: `/quizzes/${quizId}/publish`,
        method: 'PATCH',
        body: { isPublished },
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['Quiz'],
    }),

    getQuizById: builder.query({
      query: (quizId) => ({
        url: `/quizzes/${quizId}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        const data = unwrapApiData(response);
        return data?.quiz ?? data;
      },
      transformErrorResponse,
      providesTags: (_result, _error, quizId) => [{ type: 'Quiz', id: quizId }],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useLazyGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useCreateLessonMutation,
  useGetCourseLessonsQuery,
  useLazyGetLessonByIdQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  usePublishQuizMutation,
  useGetQuizByIdQuery,
} = courseApi;

export default courseApi;
