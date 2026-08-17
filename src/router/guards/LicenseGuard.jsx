import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMyLicenseQuery } from '../../features/api/licenseUserApi';
import { ROUTES } from '../../config/routes';
import { ROLES } from '../../config/roles';
import { getUserRole } from '../../utils/auth/authUtils';
import Loading from '../../components/ui/Utilities/Loading';

export const LICENSE_EXPIRED_ALLOWED_PATHS = [
  ROUTES.LICENSE_USER.LICENSE,
  ROUTES.LICENSE_USER.TICKETS,
  ROUTES.LICENSE_USER.PRIVACY,
];

const LicenseGuard = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const role = getUserRole(user);
  const isLicenseUser = role === ROLES.LICENSE_USER;

  const { data: license, isLoading, isFetching } = useGetMyLicenseQuery(
    {},
    { skip: !isLicenseUser },
  );

  if (!isLicenseUser) {
    return <Outlet />;
  }

  if (isLoading || isFetching) {
    return <Loading size="md" className="min-h-60" />;
  }

  const isSuspended = Boolean(license?.isSuspended);
  const isExpired = license?.status === 'expired' || Boolean(license?.isExpired);
  const isBlocked = !license || isSuspended || isExpired;

  if (!isBlocked) {
    return <Outlet />;
  }

  const isAllowedPath = LICENSE_EXPIRED_ALLOWED_PATHS.some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`),
  );

  if (isAllowedPath) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={ROUTES.LICENSE_USER.LICENSE}
      replace
      state={{
        licenseBlocked: true,
        reason: isSuspended ? 'suspended' : 'expired',
        from: location.pathname,
      }}
    />
  );
};

export default LicenseGuard;
