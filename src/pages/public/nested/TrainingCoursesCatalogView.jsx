import { useEffect, useMemo, useState } from 'react';
import Banner from '../../../components/common/Banner';
import { Container } from '../../../components/ui';
import CourseFilters from '../../../components/training/CourseFilters';
import CatalogCard from '../../../components/training/CatalogCard';
import { useCourse } from '../../../features/public/course/courseHooks';
import { mapPublicCoursesToCatalogCards } from '../../../features/public/course/courseMappers';

const TrainingCoursesSevView = () => {
  const { getPublicCourses, courses, loading } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    getPublicCourses().catch(() => {});
  }, [getPublicCourses]);

  const catalogCourses = useMemo(
    () => mapPublicCoursesToCatalogCards(courses),
    [courses],
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(
        new Set(catalogCourses.map((course) => course.category).filter(Boolean)),
      ),
    [catalogCourses],
  );

  const durationOptions = useMemo(
    () =>
      Array.from(
        new Set(catalogCourses.map((course) => course.duration).filter(Boolean)),
      ),
    [catalogCourses],
  );

  const filteredCourses = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return catalogCourses.filter((course) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        `${course.title} ${course.description}`
          .toLowerCase()
          .includes(normalizedSearchTerm);

      const matchesCategory = !category || course.category === category;
      const matchesDuration = !duration || course.duration === duration;

      return matchesSearch && matchesCategory && matchesDuration;
    });
  }, [searchTerm, category, duration, catalogCourses]);

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setDuration('');
  };

  return (
    <Container className=" ">
         <div className='container mx-auto px-4'>

                <Banner image="/images/course/course4.png" title={'Catalogo'} />
      <CourseFilters
        searchTerm={searchTerm}
        category={category}
        duration={duration}
        categories={categoryOptions}
        durations={durationOptions}
        onSearchTermChange={setSearchTerm}
        onCategoryChange={setCategory}
        onDurationChange={setDuration}
        onReset={handleReset}
      />

         </div>

      <CatalogCard courses={filteredCourses} loading={loading} />
    </Container>
  );
};

export default TrainingCoursesSevView;
