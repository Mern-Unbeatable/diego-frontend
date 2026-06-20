import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import DevRoleSwitcher from '../../../components/auth/DevRoleSwitcher';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { forceRole } from '../../../features/auth/authDevSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(forceRole("LICENSE_USER"));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfcfb]">
      <DashboardSidebar />

      <div className="ml-[300px] flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />
        <DevRoleSwitcher />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default DashboardLayout;
