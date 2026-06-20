import { Link, useLocation } from 'react-router-dom';

const SetupTabs = ({ basePath, steps }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4">
      {steps.map(({ label, icon, activeIcon, path }, index) => {
        const fullPath = `${basePath}/${path}`.toLowerCase();
        const currentPath = location.pathname.toLowerCase();
        const isActive =
          currentPath === fullPath ||
          (path === 'role' && currentPath === basePath.toLowerCase());

        return (
          <Link
            key={index}
            to={path}
            className={`flex items-center gap-3 transition-all duration-200 ${
              isActive ? 'text-[#30AD75]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isActive ? activeIcon : icon}
            <span
              className={`text-lg ${
                isActive ? 'font-semibold text-[#30AD75]' : 'text-gray-600'
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SetupTabs;
