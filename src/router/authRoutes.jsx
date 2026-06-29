import LoginView from '../pages/auth/LoginView';
import LanguageView from '../pages/auth/LanguageView';
import RegisterView from '../pages/auth/RegisterView';
import ChangePassword from '../pages/auth/user_Auth/create_password/ChangePassword';

import RoleSetupView from '../pages/auth/ProfileSetup/RoleSetupView';
import InfoSetupView from '../pages/auth/ProfileSetup/InfoSetupView';
import PasswordSetupView from '../pages/auth/ProfileSetup/PasswordSetupView';

export const authRoutes = [
  { path: 'login', element: <LoginView /> },
  { path: 'register', element: <RegisterView /> },
  { path: 'register/choose-language', element: <LanguageView /> },
  { path: 'change-password', element: <ChangePassword /> },
];

export const setupRoutes = [
  { path: 'register/setup-role', element: <RoleSetupView /> },
  { path: 'register/setup-info', element: <InfoSetupView /> },
  { path: 'register/setup-password', element: <PasswordSetupView /> },
];
