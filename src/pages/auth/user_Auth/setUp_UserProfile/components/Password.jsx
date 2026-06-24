import { useNavigate } from 'react-router-dom';
import SetupPassword from './SetupPassword';

const Password = () => {
  const navigate = useNavigate();

  const handlePasswordSubmit = (data) => {
    navigate('/dashboard');
  };

  return <SetupPassword onSubmitPassword={handlePasswordSubmit} />;
};
export default Password;
