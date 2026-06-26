import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, InputField, Label } from '../../components/ui';
import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

// Constants
const OTP_LENGTH = 6;
const STEPS = {
  EMAIL: 1,
  OTP: 2,
};

// Custom hook for OTP management
const useOtp = (length = OTP_LENGTH) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = useCallback(
    (value, index) => {
      // Only allow digits
      if (!/^\d*$/.test(value)) return;

      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length],
  );

  const resetOtp = useCallback(() => {
    setOtp(Array(length).fill(''));
    inputRefs.current[0]?.focus();
  }, [length]);

  const isComplete = useCallback(() => {
    return otp.every((digit) => digit !== '');
  }, [otp]);

  return { otp, inputRefs, handleChange, resetOtp, isComplete };
};

// Step Components
const EmailStep = ({ email, onEmailChange, onSubmit, t }) => (
  <form onSubmit={onSubmit}>
    <Label className="mb-2 block text-lg font-medium">{t('auth.common.emailLabel')}</Label>
    <InputField
      type="email"
      value={email}
      placeholder={t('auth.common.emailPlaceholder')}
      className="rounded-2xl border border-green-100 bg-white px-4 py-3"
      onChange={(e) => onEmailChange(e.target.value)}
      autoFocus
      required
    />
    <div className="mt-8 flex justify-end">
      <SubmitButton type="submit">{t('auth.common.goAhead')}</SubmitButton>
    </div>
  </form>
);

// OTP Step Component
const OtpStep = ({ email, otp, inputRefs, onOtpChange, onBack, onSubmit, t }) => (
  <form onSubmit={onSubmit}>
    <p className="mb-6 text-center text-gray-600">
      {t('auth.login.otpSentTo')} <strong>{email}</strong>
    </p>

    <div className="flex justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onOtpChange(e.target.value, index)}
          className="h-14 w-14 rounded-xl border border-green-100 bg-white text-center text-xl focus:border-[#73BFA1] focus:outline-none"
          aria-label={`OTP digit ${index + 1}`}
          autoFocus={index === 0}
        />
      ))}
    </div>

    <div className="mt-8 flex justify-end gap-3">
      <BackButton onClick={onBack} t={t} />
      <SubmitButton type="submit">{t('auth.common.verifyOtp')}</SubmitButton>
    </div>
  </form>
);

// Reusable Button Components
const SubmitButton = ({ children, ...props }) => (
  <button
    className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white transition-colors duration-200 hover:bg-white hover:text-[#73BFA1]"
    {...props}
  >
    {children}
  </button>
);

// Back Button Component
const BackButton = ({ onClick, t }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-600 transition-colors duration-200 hover:bg-gray-50"
  >
    <IoIosArrowBack />
    {t('auth.common.back')}
  </button>
);

// Logo Component
const Logo = ({ t }) => (
  <div className="flex items-center gap-2">
    <img
      className="h-10 w-10 object-contain"
      src="/images/icons/title.png"
      alt={t('auth.common.logoAlt')}
      loading="lazy"
    />
    <h1 className="text-3xl font-bold text-gray-900">UnoSicurezza</h1>
  </div>
);

// Main Component
const RegisterView = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(STEPS.EMAIL);
  const navigate = useNavigate();

  const { otp, inputRefs, handleChange: handleOtpChange, resetOtp } = useOtp();

  // Navigation handlers
  const goToNextStep = useCallback(() => {
    setStep(STEPS.OTP);
  }, []);

  const goToPreviousStep = useCallback(() => {
    setStep(STEPS.EMAIL);
    resetOtp();
  }, [resetOtp]);

  const goToProfileSetup = useCallback(() => {
    navigate('/auth/register/setup-role');
  }, [navigate]);

  // Step handlers
  const handleEmailSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email.trim()) {
        alert(t('auth.register.enterEmailAlert'));
        return;
      }

      // Here you would typically send OTP to email
      goToNextStep();
    },
    [email, goToNextStep, t],
  );

  const handleOtpSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Here you would verify OTP with backend
      // For now, navigate directly
      goToProfileSetup();
    },
    [goToProfileSetup],
  );

  // Auto-focus first input when OTP step loads
  useEffect(() => {
    if (step === STEPS.OTP && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step, inputRefs]);

  // Get illustration based on current step
  const illustration =
    step === STEPS.OTP ? '/image/icon/otp.png' : '/image/icon/password.jpg';

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-2">
        {/* Left Section - Logo & Illustration */}
        <div className="flex flex-col items-center justify-center bg-white p-10">
          <Logo t={t} />
          <div className="mt-10 max-w-md">
            <img
              className="w-full object-contain"
              src={illustration}
              alt={
                step === STEPS.OTP
                  ? t('auth.register.otpIllustrationAlt')
                  : t('auth.register.emailIllustrationAlt')
              }
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex items-center bg-[#F1F9F6] px-8 py-12 lg:px-20">
          <div className="w-full">
            {/* Title */}
            <div className="mb-8">
              <Heading level={3} className="text-center">
                {step === STEPS.OTP
                  ? t('auth.login.enterOtpTitle')
                  : t('auth.register.enterEmailTitle')}
              </Heading>
            </div>

            {/* Step Renderer */}
            {step === STEPS.EMAIL ? (
              <EmailStep
                email={email}
                onEmailChange={setEmail}
                onSubmit={handleEmailSubmit}
                t={t}
              />
            ) : (
              <OtpStep
                email={email}
                otp={otp}
                inputRefs={inputRefs}
                onOtpChange={handleOtpChange}
                onBack={goToPreviousStep}
                onSubmit={handleOtpSubmit}
                t={t}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
