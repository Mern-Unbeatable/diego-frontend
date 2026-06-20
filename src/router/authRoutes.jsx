import UserInformationForm from '../components/auth/UserInformationForm';
import ChangePassword from '../pages/auth/ChangePassword';
import ChooseLanguageView from '../pages/auth/ChooseLanguageView';
import LoginView from '../pages/auth/LoginView';
import RegisterView from '../pages/auth/RegisterView';
import Password from '../pages/auth/user_Auth/setUp_UserProfile/components/Password';
import Role from '../pages/auth/user_Auth/setUp_UserProfile/components/Role';
import InformationRouter from './InformationRouter';


export const authRoutes = [
  { path: 'login', element: <LoginView /> },
  { path: 'register', element: <RegisterView /> },
  { path: 'register/choose-language', element: <ChooseLanguageView /> },
  { path: 'change-password', element: <ChangePassword /> },
];

export const setupRoutes = [
  { path: "register/setup-profile/role", element: <Role /> },
  { path: "register/setup-profile/information", element: <InformationRouter /> },
  { path: "register/setup-profile/password", element: <Password /> },
];