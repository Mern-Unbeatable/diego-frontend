import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserRole, getDashboardPath } from '../../utils/authUtils';

const RoleGuard = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = getUserRole(user);

  if (!isAuthenticated || !role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles?.includes(role)) {
    return <Navigate to={getDashboardPath(role) || '/dashboard'} replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
