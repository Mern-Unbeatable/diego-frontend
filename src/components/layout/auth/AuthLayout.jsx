import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#fff]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
