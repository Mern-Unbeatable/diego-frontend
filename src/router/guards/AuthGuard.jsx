import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const result =
    user && isAuthenticated ? (
      <Navigate to="/auth/login" replace />
    ) : (
      <Outlet />
    );

  return result;
};

export default AuthGuard;
