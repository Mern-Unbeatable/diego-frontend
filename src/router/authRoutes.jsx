import LoginView from '../pages/auth/LoginView';
import ChooseLanguageView from '../pages/auth/ChooseLanguageView';
import RegisterView from '../pages/auth/RegisterView';
import ChangePassword from '../pages/auth/ChangePassword';

import SetupRole from '../pages/auth/user_Auth/setUp_UserProfile/components/SetupRole';
import InformationRouter from '../pages/auth/user_Auth/setUp_UserProfile/components/InformationRouter';
import SetupPassword from '../pages/auth/user_Auth/setUp_UserProfile/components/SetupPassword';

export const authRoutes = [
  { path: 'login', element: <LoginView /> },
  { path: 'register', element: <RegisterView /> },
  { path: 'register/choose-language', element: <ChooseLanguageView /> },
  { path: 'change-password', element: <ChangePassword /> },
];

export const setupRoutes = [
  { path: 'register/setup-role', element: <SetupRole /> },
  {
    path: 'register/setup-info',
    element: <InformationRouter />,
  },
  { path: 'register/setup-password', element: <SetupPassword /> },
];
