import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// ✅ Layouts
import MainLayout from '../layout/public/MainLayout.jsx';
import AuthLayout from '../layout/auth/AuthLayout.jsx';
import SetupLayout from '../layout/auth/SetupLayout.jsx';
import DashboardLayout from '../layout/dashboard/DashboardLayout.jsx';
import AccessLinkRedemptionView from '../pages/public/AccessLinkRedemptionView.jsx';
import ArchiveSuccessView from '../pages/public/archive/ArchiveSuccessView.jsx';
import ArchiveCancelView from '../pages/public/archive/ArchiveCancelView.jsx';

// ✅ Guards
import RoleGuard from './guards/RoleGuard.jsx';
import AuthGuard from './guards/AuthGuard.jsx';
import LicenseGuard from './guards/LicenseGuard.jsx';
import PublicGuard from './guards/PublicGuard.jsx';

// ✅ Route Config
import { publicRoutes } from './publicRoutes.jsx'; // public
import { nestedPublicRoutes } from './publicNestedRoutes.jsx'; // public
import { dashboardRoutes } from './dashRoutes.jsx'; // dashboard
import { authRoutes, setupRoutes } from './authRoutes.jsx'; // Auth

//  ✅ Error
import ErrorView from '../pages/err/ErrorView.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ScrollToTop />}>

        <Route path="/" element={<MainLayout />}>
          {publicRoutes.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              index={r.path === ''}
              element={r.element}
            />
          ))}
          {nestedPublicRoutes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Route>

        <Route path="/enrollments/access/:token" element={<AccessLinkRedemptionView />} />
        <Route path="/certificates/archive/success" element={<ArchiveSuccessView />} />
        <Route path="/certificates/archive/cancel" element={<ArchiveCancelView />} />


        <Route element={<PublicGuard />}>
          <Route path="/auth" element={<AuthLayout />}>
            {/* Auth routes (no sidebar) */}
            {authRoutes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={r.element}
                index={r.path === 'register/choose-language'}
              />
            ))}

            {/* Auth setup routes (with sidebar / custom layout) */}
            <Route element={<SetupLayout />}>
              {setupRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Route>
        </Route>

        {/* ✅ DASHBOARD */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {dashboardRoutes.map(({ roles, routes, licenseGuard }) => (
              <Route
                key={roles.join('-')}
                element={<RoleGuard allowedRoles={roles} />}
              >
                {licenseGuard ? (
                  <Route element={<LicenseGuard />}>
                    {routes.map((r) => (
                      <Route key={r.path} path={r.path} element={r.element} />
                    ))}
                  </Route>
                ) : (
                  routes.map((r) => (
                    <Route key={r.path} path={r.path} element={r.element} />
                  ))
                )}
              </Route>
            ))}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<ErrorView />} />
      </Route>
    </>,
  ),
);

export default router;
