import { useLocation } from 'react-router-dom';
import SetupInfo from './SetupInfo';
import CompanyInformation from '../../../../../components/auth/CompanyInformationForm';
import FreelancerInformationForm from '../../../../../components/auth/FreelancerInformationForm';

const InformationRouter = () => {
  const location = useLocation();

  const role = location.state?.role;

  if (!role) {
    return <SetupInfo />;
  }

  switch (role) {
    case 'business':
      return <CompanyInformation />;

    case 'licensed':
      return <FreelancerInformationForm />;

    case 'standard':
    default:
      return <SetupInfo />;
  }
};

export default InformationRouter;
