import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserRole, getDashboardPath } from '../../utils/authUtils';

const PublicGuard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const role = getUserRole(user);

  if (isAuthenticated && role) {
    return <Navigate to={getDashboardPath(role) || '/dashboard'} replace />;
  }

  return <Outlet />;
};

export default PublicGuard;
