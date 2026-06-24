import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return <div className='bg-[#fff] p-24 min-h-screen flex flex-col  justify-center items-center  w-full'>
    <Outlet />;
  </div>
};

export default AuthLayout;
