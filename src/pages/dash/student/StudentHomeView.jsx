import LeftContent from './components/LeftContent';
import ProfileSidebar from './components/ProfileSidebar';

const StudentHomeView = () => {
  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-4">
        {/* Left side - Main content (3/4 width) */}
        <div className="flex h-full flex-col space-y-6 lg:col-span-3">
          <LeftContent />
        </div>

        {/* Right side - Profile Panel (1/3 width) */}
        {/* Right side - Profile Panel (1/4 width) */}
        <div className="h-full lg:col-span-1">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};


export default StudentHomeView;
