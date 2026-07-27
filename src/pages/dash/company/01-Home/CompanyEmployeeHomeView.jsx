import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CourseCard from '../../private/01-Home/components/CourseCard';
import HeroBanner from '../../private/01-Home/components/HeroBanner';
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
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-lg bg-[#73bfa1] px-6 py-8 text-white">
        <p className="mb-1 text-sm text-[#ecfff7]">Ciao!</p>
        <h1 className="text-[38px] font-semibold text-white">
          {employeeName || 'Corsista'}
        </h1>
      </section>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          I tuoi corsi assegnati
        </h2>

        {courses.length === 0 ? (
          <p className="rounded-xl border border-[#ececec] bg-white p-6 text-sm text-gray-600">
            Nessun corso assegnato. L&apos;amministratore della tua azienda deve
            assegnarti un corso prima di poter iniziare la formazione.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
