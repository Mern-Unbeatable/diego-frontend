import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// DEV MODE: set true to test routes without real login.
const DEV_BYPASS_AUTH = true;
// Change this role manually while testing.
const DEV_MANUAL_ROLE = 'PRIVATE_USER';

const roleToDashboardPath = {
  PLATFORM_ADMIN: '/dashboard/super-admin',
  COMPANY_ADMIN: '/dashboard/company-admin',
  COMPANY_EMPLOYEE: '/dashboard/company-admin',
  LICENSE_USER: '/dashboard/license-user',
  PRIVATE_USER: '/dashboard/private-user',
};

const PublicGuard = () => {
  const { user, isAuthenticated, tempRole } = useSelector(
    (state) => state.auth,
  );

  const activeRole = DEV_BYPASS_AUTH ? DEV_MANUAL_ROLE : tempRole || user?.role;
  const authState = DEV_BYPASS_AUTH ? true : isAuthenticated;

  if (activeRole && authState) {
    return (
      <Navigate to={roleToDashboardPath[activeRole] || '/dashboard'} replace />
    );
  }

  // If not logged in, show public/auth routes
  return <Outlet />;
};

export default PublicGuard;
