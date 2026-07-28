import { Outlet } from 'react-router-dom';

import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfcfb]">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-[300px]">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
