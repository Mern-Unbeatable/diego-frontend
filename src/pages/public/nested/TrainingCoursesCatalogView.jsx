import { useMemo, useState } from 'react';
import Banner from '../../../components/common/Banner';
import { Container } from '../../../components/ui';
import CourseFilters from '../../../components/training/CourseFilters';
import CatalogCard from '../../../components/training/CatalogCard';
import { courses } from '../../../components/training/CourseCard';

const TrainingCoursesSevView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  const categoryOptions = useMemo(
    () => Array.from(new Set(courses.map((course) => course.category))),
    []
  );

  const durationOptions = useMemo(
    () => Array.from(new Set(courses.map((course) => course.duration))),
    []
  );

  const filteredCourses = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        `${course.title} ${course.description}`
          .toLowerCase()
          .includes(normalizedSearchTerm);

      const matchesCategory = !category || course.category === category;
      const matchesDuration = !duration || course.duration === duration;

      return matchesSearch && matchesCategory && matchesDuration;
    });
  }, [searchTerm, category, duration]);

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setDuration('');
  };

  return (
    <Container className=" ">
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

      <CatalogCard courses={filteredCourses} />
    </Container>
  );
};

export default TrainingCoursesSevView;
