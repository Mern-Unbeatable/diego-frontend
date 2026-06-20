import { useNavigate } from "react-router-dom";
import SignUpPassword from '../../../../../components/common/SignUpPassword';

const Password = () => {
  const navigate = useNavigate();

  const handlePasswordSubmit = (data) => {


    navigate("/dashboard");
  };

  return <SignUpPassword onSubmitPassword={handlePasswordSubmit} />;
};
export default Password;
