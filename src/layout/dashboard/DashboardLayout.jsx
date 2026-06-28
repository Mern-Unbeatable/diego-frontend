import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
// import DevRoleSwitcher from './DevRoleSwitcher';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfcfb]">
      <DashboardSidebar />

      <div className="ml-[300px] flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />
        {/* <DevRoleSwitcher /> */}

        <main className="flex-1 overflow-y-auto p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
