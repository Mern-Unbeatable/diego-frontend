import { useEffect, useMemo, useState } from 'react';
import Banner from '../../../components/common/Banner';
import { Container } from '../../../components/ui';
import CourseFilters from '../../../components/training/CourseFilters';
import CatalogCard from '../../../components/training/CatalogCard';
import { useCourse } from '../../../features/public/course/courseHooks';
import { ENV_CONFIG } from '../../../config/env.config';

const API_ORIGIN = (() => {
  try {
    return new URL(ENV_CONFIG.API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

const resolveImageUrl = (url) => {
  if (!url) return '/images/course/course1.png';
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      if (
        API_ORIGIN &&
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
      ) {
        return `${API_ORIGIN}${parsed.pathname}${parsed.search}`;
      }
    } catch {
      return url;
    }
    return url;
  }
  if (!API_ORIGIN) return url;
  return `${API_ORIGIN}/${String(url).replace(/^\/+/, '')}`;
};

const TrainingCoursesSevView = () => {
  const { getPublicCourses, courses, loading } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    getPublicCourses().catch(() => {});
  }, [getPublicCourses]);

  const catalogCourses = useMemo(
    () =>
      (courses || []).map((course) => {
        const reviewCount = course?._count?.reviews ?? 0;
        const rating =
          reviewCount > 0
            ? course.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
              reviewCount
            : 0;

        return {
          id: course.id,
          title: course.courseTitle,
          category: course.format || '-',
          duration: course.durationMinutes
            ? `${course.durationMinutes} min`
            : '-',
          description: course.description || '',
          oldPrice: course.basePrice || 0,
          price: course.price || 0,
          rating,
          reviews: reviewCount,
          image: resolveImageUrl(course.thumbnailUrl),
        };
      }),
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

      <CatalogCard courses={filteredCourses} loading={loading} />
    </Container>
  );
};

export default TrainingCoursesSevView;
