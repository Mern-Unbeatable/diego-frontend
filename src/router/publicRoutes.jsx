import ContactUsView from '../pages/public/ContactUsView';
import HomeView from '../pages/public/home/HomeView';
import ServicesView from '../pages/public/services/ServicesView';
import TrainingView from '../pages/public/TrainingView';
import WhoWeAreView from '../pages/public/WhoWeAreView';
import WorkWithUsView from '../pages/public/WorkWithUsView';

export const publicRoutes = [
  { path: '', element: <HomeView /> },
  { path: 'services', element: <ServicesView /> },
  { path: 'training', element: <TrainingView /> },
  { path: 'who_we_are', element: <WhoWeAreView /> },
  { path: 'work_with_us', element: <WorkWithUsView /> },
  { path: 'contact_us', element: <ContactUsView /> },
];
