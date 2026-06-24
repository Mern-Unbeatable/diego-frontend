import SetUpRole from './SetupRole';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log('Selected role:', role);
  };

  const handleNext = (role) => {
    handleRoleSelect(role);
    navigate('/auth/register/setup-profile/information');
  };

  return <SetUpRole onSelectRole={handleNext} />;
};

export default Role;
