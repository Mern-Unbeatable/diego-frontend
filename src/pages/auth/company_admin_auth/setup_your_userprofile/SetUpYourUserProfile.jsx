import { RiRadioButtonFill } from 'react-icons/ri';
import { PiRadioButtonDuotone } from 'react-icons/pi';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { H3 } from '../../../../components/ui/Heading';
import P from '../../../../components/ui/P';

const categories = [
  { label: 'Role', path: 'CompanyAdminRole' },
  { label: 'Information', path: 'CompanyInformation' },
  { label: 'Password', path: 'CompanyPassword' },
];

const SetUpYourUserProfile = () => {
  const location = useLocation();

  return (
    <div className="mx-auto grid w-full grid-cols-7 overflow-hidden md:h-screen md:grid-cols-6">
      <div className="col-span-3 flex h-auto flex-col items-center border border-gray-100 bg-[#F1F9F6] p-8 md:col-span-2 md:h-screen">
        <img
          className="h-[91px] w-[104px]"
          src="/image/icon/droplogo.png"
          alt=""
        />
        <H3 className={'my-4'} h3={'Set up your user profile'} />

        <div className="flex flex-col gap-4">
          {categories.map((category, index) => {
            const isDefaultRoleActive =
              category.path === 'CompanyAdminRole' &&
              location.pathname === '/SetUpYourUserProfile';

            return (
              <NavLink
                key={index}
                to={category.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 ${
                    isActive || isDefaultRoleActive
                      ? 'text-[#30AD75]'
                      : 'text-gray-500'
                  }`
                }
              >
                {({ isActive }) => {
                  const active = isActive || isDefaultRoleActive;
                  return (
                    <>
                      {active ? (
                        <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />
                      ) : (
                        <RiRadioButtonFill className="h-5 w-5" />
                      )}
                      <P
                        className={`text-lg transition-colors ${
                          active
                            ? 'font-medium text-[#30AD75]'
                            : 'text-gray-500'
                        }`}
                        p={category.label}
                      />
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Right Side (Content Outlet) */}
      <div className="col-span-4 h-auto overflow-auto md:h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default SetUpYourUserProfile;
