import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CourseCard from '../../private/01-Home/components/CourseCard';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  getMyEnrollmentsService,
  getMyProfileService,
  mapEnrollmentToCourseCard,
} from '../../../../features/employee/employeeService';
import { ROUTES } from '../../../../config/routes';

const getCategoryClasses = (category) => {
  switch ((category || '').toUpperCase()) {
    case 'COMPLETATO':
      return 'text-[#05563f] bg-[#F1F9F6]';
    case 'IN CORSO':
      return 'text-[#8a5b00] bg-[#FFF0D9]';
    case 'NON ANCORA INIZIATO':
      return 'text-[#2b7a64] bg-[#E8F8F3]';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};

const CompanyEmployeeHomeView = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [enrollmentsData, profileData] = await Promise.all([
        getMyEnrollmentsService({ limit: 50 }),
        getMyProfileService().catch(() => null),
      ]);

      const enrollments = enrollmentsData?.enrollments ?? [];
      setCourses(enrollments.map(mapEnrollmentToCourseCard));

      const user = profileData?.user ?? profileData;
      const name = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
      setEmployeeName(name || user?.email || '');
    } catch (error) {
      toast.error(error?.message || 'Impossibile caricare i corsi assegnati');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-7">
      <section className="overflow-hidden rounded-lg bg-[#73bfa1] px-4 py-5 text-white sm:px-6 sm:py-8">
        <p className="mb-1 text-sm text-[#ecfff7]">Ciao!</p>
        <h1 className="truncate text-xl font-semibold text-white sm:text-2xl md:text-3xl">
          {employeeName || 'Corsista'}
        </h1>
      </section>

      <div className="min-w-0">
        <h2 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg md:text-xl">
          I tuoi corsi assegnati
        </h2>

        {courses.length === 0 ? (
          <p className="rounded-xl border border-[#ececec] bg-white p-4 text-sm text-gray-600 sm:p-6">
            Nessun corso assegnato. L&apos;amministratore della tua azienda deve
            assegnarti un corso prima di poter iniziare la formazione.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                getCategoryClasses={getCategoryClasses}
                onCardClick={() =>
                  navigate(`${ROUTES.COMPANY_EMPLOYEE.COURSE}/${course.courseId}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyEmployeeHomeView;
