import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetailsAPI, getPublicCoursesAPI } from './courseAPI';
import { selectCourse } from './courseSelectors';

export const useCourse = () => {
  const dispatch = useDispatch();
  const courseState = useSelector(selectCourse);

  const getPublicCourses = useCallback(async () => {
    const result = await dispatch(getPublicCoursesAPI()).unwrap();
    return result;
  }, [dispatch]);

  const getCourseDetails = useCallback(
    async (courseId) => {
      const result = await dispatch(getCourseDetailsAPI(courseId)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    getPublicCourses,
    getCourseDetails,
    ...courseState,
  };
};
