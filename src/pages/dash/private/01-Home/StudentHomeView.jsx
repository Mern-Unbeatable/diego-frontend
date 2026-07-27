import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  getMyEnrollmentsService,
  getMyProfileService,
  mapEnrollmentToCourseCard,
} from '../../../../features/private/privateService';
import LeftContent from './components/LeftContent';
import ProfileSidebar from './components/ProfileSidebar';

const StudentHomeView = () => {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState('');
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
      setUserName(name || user?.email || '');
    } catch (error) {
      toast.error(error?.message || 'Impossibile caricare i tuoi corsi');
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
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 items-stretch gap-8 2xl:grid-cols-4">
        <div className="flex h-full flex-col space-y-6 2xl:col-span-3">
          <LeftContent courses={courses} />
        </div>

        <div className="h-full 2xl:col-span-1">
          <ProfileSidebar userName={userName} />
        </div>
      </div>
    </div>
  );
};

export default StudentHomeView;
