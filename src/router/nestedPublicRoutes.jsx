
import Checkout from '../pages/public/checkout';
import CourseDetails from '../pages/public/CourseDetail';
import {
  AmbientRentView,
  CondominiumPropertyView,
  OccupationalCompetentView,
  OccupationalLaboratoryView,
  OccupationalMedicalView,
  SafetyBuildingView,
  SafetyDrinkingWater,
  SafetyEditorial,
  SafetyEmergencyView,
  SafetyLaboratoryView,
  SafetyLegionView,
  SafetyLightningView,
  SafetyRadonView,
  SafetyServiceView,
  SafetySevCoursesView,
  TrainingCoursesCatalogView,
  TrainingCoursesRequiredView,
  TrainingCoursesSevView,
  TrainingOurPlatformView,
  VideoAndAuthorizationView,
} from '../pages/public/nested';
import LabratoryAnalysis from '../pages/public/nested/LabratoryAnalysis';

export const nestedPublicRoutes = [
  { path: 'services/sev/sev-courses', element: <SafetySevCoursesView /> },
  { path: 'services/security/asp-service', element: <SafetyServiceView /> },
  { path: 'services/security/dvr-editorial', element: <SafetyEditorial /> },
  {
    path: 'services/security/emergency-plans',
    element: <SafetyEmergencyView />,
  },
  { path: 'services/security/legion', element: <SafetyLegionView /> },
  { path: 'services/security/radon', element: <SafetyRadonView /> },
  { path: 'services/security/lightning', element: <SafetyLightningView /> },
  { path: 'services/safety/drinking-water', element: <SafetyDrinkingWater /> },
  {
    path: 'services/security/laboratory-analysis',
    element: <SafetyLaboratoryView />,
  },
  {
    path: 'services/security/building-management',
    element: <SafetyBuildingView />,
  },
  { path: 'services/environment/rent', element: <AmbientRentView /> },
  {
    path: 'services/video/authorization',
    element: <VideoAndAuthorizationView />,
  },
  {
    path: 'services/medicine/assignments',
    element: <OccupationalCompetentView />,
  },
  {
    path: 'services/medicine-del/assignments',
    element: <OccupationalMedicalView />,
  },
  {
    path: 'services/medicine-del/analysis',
    element: <OccupationalLaboratoryView />,
  },
  {
    path: 'services/condominium/management',
    element: <CondominiumPropertyView />,
  },
  {
    path: 'services/condominium/laboratory-analysis',
    element: <LabratoryAnalysis />,
  },
  { path: 'training/courses/our', element: <TrainingOurPlatformView /> },
  {
    path: 'training/courses/mandatory-courses',
    element: <TrainingCoursesSevView />,
  },
  {
    path: 'training/courses/how-it-works',
    element: <TrainingCoursesRequiredView />,
  },
  { path: 'training/courses/catalog', element: <TrainingCoursesCatalogView /> },
  { path: 'training/course/details', element: <CourseDetails /> },
  { path: 'training/course/checkout', element: <Checkout /> },
];

