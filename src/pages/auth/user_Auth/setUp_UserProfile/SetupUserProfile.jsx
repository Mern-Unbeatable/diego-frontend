import { RiRadioButtonFill } from 'react-icons/ri';
import { PiRadioButtonDuotone } from 'react-icons/pi';
import { Outlet } from 'react-router-dom';
import { Heading } from '../../components/ui';
import SetupTabs from './SetupTabs';
import { useTranslation } from 'react-i18next';

const SetupView = () => {
  const { t } = useTranslation();
  const basePath = '/auth/setUp-userProfile';
  const categories = [
    {
      label: t('auth.setup.tabs.role'),
      icon: <RiRadioButtonFill className="h-5 w-5" />,
      activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
      path: 'role',
    },
    {
      label: t('auth.setup.tabs.information'),
      icon: <RiRadioButtonFill className="h-5 w-5" />,
      activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
      path: 'information',
    },
    {
      label: t('auth.setup.tabs.password'),
      icon: <RiRadioButtonFill className="h-5 w-5" />,
      activeIcon: <PiRadioButtonDuotone className="h-5 w-5 text-[#30AD75]" />,
      path: 'password',
    },
  ];

  return (
    <div className="mx-auto grid w-full grid-cols-7 overflow-hidden md:h-screen md:grid-cols-6">
      <div className="col-span-3 flex flex-col items-center border border-gray-100 bg-[#F1F9F6] p-8 md:col-span-2 md:h-screen">
        <img
          className="h-[91px] w-[104px]"
          src="/image/icon/droplogo.png"
          alt={t('auth.common.logoAlt')}
        />
        <Heading level={3}>{t('auth.setup.profileTitle')}</Heading>
        <SetupTabs basePath={basePath} steps={categories} />
      </div>

      <div className="col-span-4 h-auto overflow-auto md:h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default SetupView;
