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

// ✅ Guards
import RoleGuard from './guards/RoleGuard.jsx';
import AuthGuard from './guards/AuthGuard.jsx';
import PublicGuard from './guards/PublicGuard.jsx';

// ✅ Route Config
import { publicRoutes } from './publicRoutes.jsx'; // public
import { nestedPublicRoutes } from './nestedPublicRoutes.jsx'; // public
import { dashboardRoutes } from './dashboardRoutes.jsx'; // dashboard
import { authRoutes, setupRoutes } from './authRoutes.jsx'; // Auth

//  ✅ Error
import ErrorView from '../pages/err/ErrorView.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ✅ PUBLIC */}
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

      {/* ✅ AUTH */}
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
          {dashboardRoutes.map(({ roles, routes }) => (
            <Route
              key={roles.join('-')}
              element={<RoleGuard allowedRoles={roles} />}
            >
              {routes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          ))}
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<ErrorView />} />
    </>,
  ),
);

export default router;
