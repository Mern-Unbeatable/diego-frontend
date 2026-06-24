import { useLocation, useNavigate } from 'react-router-dom';
import SetupInfo from './SetupInfo';
import CompanyInformation from '../../../../../components/auth/CompanyInformationForm';
import FreelancerInformationForm from '../../../../../components/auth/FreelancerInformationForm';

/**
 * InformationRouter - Renders different information forms based on selected role
 * Expects role to be passed via navigation state from SetupRole component
 */
const InformationRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get role from navigation state
  const role = location.state?.role;

  // Fallback if no role is found - redirect to role selection
  if (!role) {
    return (
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">Role Selection Required</h2>
        <p className="mb-4 text-gray-600">Please select a role first.</p>
        <button
          onClick={() => navigate('/auth/register/setup-profile/role')}
          className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
        >
          Go Back to Role Selection
        </button>
      </div>
    );
  }

  // Render appropriate form based on role
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
