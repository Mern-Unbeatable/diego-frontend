import { FaUsers } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';
import StudentAdminSidebar from '../admin/studentAdmin/StudentAdminSidebar';

const StudentAdminView = () => {
  return (
    <section className="flex min-h-screen bg-white">
      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className="fixed z-10 h-screen lg:relative lg:w-[280px]">
        <StudentAdminSidebar />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex-1 bg-[#F9FAFB]">
        {/* Topbar - Visible on large screen */}
        <div className="hidden lg:block">
          <div className="fixed top-0 right-0 z-30 bg-white px-5 py-5 lg:left-[280px]">
            <div className="grid grid-cols-4 items-center">
              <div></div>
              <div className="col-span-3 flex items-center justify-between">
                <p className="text-base font-normal text-black">
                  Stai cercando nuovi corsi?{' '}
                  <span className="pl-2 text-[#73BFA1]">Esplora ora</span>
                </p>
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="rounded-full bg-gray-100 p-2">
                    <IoSearchOutline className="h-7 w-7 text-lg text-gray-700" />
                  </div>
                  <div className="rounded-full bg-gray-100 p-2">
                    <IoMdNotificationsOutline className="h-7 w-7 text-lg text-gray-700" />
                  </div>
                  <div className="rounded-full bg-gray-100 p-2">
                    <FaUsers className="h-7 w-7 text-lg text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outlet area */}
        <div className="px-4 pt-[100px]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default StudentAdminView;
