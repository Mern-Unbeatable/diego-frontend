import { RiRadioButtonFill } from 'react-icons/ri';
import { PiRadioButtonDuotone } from 'react-icons/pi';
import { Outlet } from 'react-router-dom';
import { Heading } from '../../components/ui';
import SetupTabs from './SetupTabs';

const categories = [
  {
    label: 'Role',
    icon: <RiRadioButtonFill className="h-5 w-5" />,
    activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
    path: 'role',
  },
  {
    label: 'Information',
    icon: <RiRadioButtonFill className="h-5 w-5" />,
    activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
    path: 'information',
  },
  {
    label: 'Password',
    icon: <RiRadioButtonFill className="h-5 w-5" />,
    activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
    path: 'password',
  },
];

const SetupView = () => {
  const basePath = '/auth/setUp-userProfile';

  return (
    <div className="mx-auto grid w-full grid-cols-7 overflow-hidden md:h-screen md:grid-cols-6">
      <div className="col-span-3 flex flex-col items-center border border-gray-100 bg-[#F1F9F6] p-8 md:col-span-2 md:h-screen">
        <img
          className="h-[91px] w-[104px]"
          src="/image/icon/droplogo.png"
          alt="logo"
        />
        <Heading level={3}>Set up your user profile</Heading>

        <SetupTabs basePath={basePath} steps={categories} />
      </div>

      <div className="col-span-4 h-auto overflow-auto md:h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default SetupView;
