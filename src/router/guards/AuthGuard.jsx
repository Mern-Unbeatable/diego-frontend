import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserRole } from '../../utils/authUtils';

const AuthGuard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const role = getUserRole(user);

  if (!isAuthenticated || !role) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
