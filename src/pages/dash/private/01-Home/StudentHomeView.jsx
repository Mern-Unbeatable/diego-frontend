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
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [enrollmentsData, profileData] = await Promise.all([
        getMyEnrollmentsService(),
        getMyProfileService().catch(() => null),
      ]);

      const enrollments = enrollmentsData?.enrollments ?? [];
      setCourses(enrollments.map(mapEnrollmentToCourseCard));

      const user = profileData?.user ?? profileData?.data?.user ?? profileData;
      const name = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
      setUserName(name || user?.email || '');
      setUserAvatar(user?.avatar || null);
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
    <div className="min-w-0 bg-gray-50">
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        <div className="order-2 flex min-w-0 flex-col space-y-5 sm:space-y-6 xl:order-1 xl:col-span-3">
          <LeftContent courses={courses} />
        </div>

        <div className="order-1 min-w-0 xl:order-2 xl:col-span-1 xl:sticky xl:top-6">
          <ProfileSidebar userName={userName} avatar={userAvatar} />
        </div>
      </div>
    </div>
  );
};

export default StudentHomeView;
