import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StandardInfoForm from './components/StanderInfoForm';
import CompanyInfoForm from './components/CompanyInfoForm';
import LicenseInfoForm from './components/LicenseInfoForm';
import { STORAGE } from '../../../utils/storage/authStorage';

/**
 * InformationRouter - Renders different information forms based on selected role
 * Expects role from navigation state or persisted STORAGE.accountType
 */
const InfoSetupView = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || STORAGE.getUser()?.accountType;

  if (!role) {
    return (
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">
          {t('auth.setup.infoRouter.roleRequiredTitle')}
        </h2>
        <p className="mb-4 text-gray-600">
          {t('auth.setup.infoRouter.roleRequiredDescription')}
        </p>
        <button
          onClick={() => navigate('/auth/register/setup-role')}
          className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
        >
          {t('auth.setup.infoRouter.backToRoleSelection')}
        </button>
      </div>
    );
  }

  switch (role) {
    case 'business':
      return <CompanyInfoForm />;
    case 'licensed':
      return <LicenseInfoForm />;
    case 'standard':
    default:
      return <StandardInfoForm />;
  }
};

export default InfoSetupView;
