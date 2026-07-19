import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { Heading, InputField, Label } from '../../components/ui';
import { useAuth } from '../../features/auth/authHooks';
import COOKIE_STORAGE from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';
import toast from 'react-hot-toast';

const RegisterView = () => {
  const [email, setEmail] = useState(() => STORAGE.getUser()?.email || '');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [step, setStep] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const otpRefs = useRef([]);

  const { register, loading, verifyRegisterOtp } = useAuth();
  const navigate = useNavigate();

  // Auto-focus first input on OTP step
  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  const getPreferredLanguage = () => {
    const fromDraft = STORAGE.getUser()?.preferredLanguage;
    if (fromDraft) return fromDraft;
    const fromI18n = localStorage.getItem('i18nextLng');
    return fromI18n?.split('-')[0] || 'en';
  };

  // STEP 1 → STEP 2 (EMAIL)
  const handleNextFromEmail = async (e) => {
    e.preventDefault();

    try {
      const preferredLanguage = getPreferredLanguage();

      STORAGE.setUser({
        preferredLanguage,
      });

      await register({
        email,
        preferredLanguage,
      });

      toast.success('OTP sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(
        typeof error === 'string'
          ? error
          : error?.message || 'Please check your email and try again.',
      );
      console.error('Registration error:', error);
    }
  };

  // Handle OTP input change with paste support
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Handle paste
    if (value.length > 1) {
      const pasteData = value
        .slice(0, 6)
        .split('')
        .filter((char) => /^\d$/.test(char));
      if (pasteData.length > 0) {
        const newOtp = [...otp];
        pasteData.forEach((char, i) => {
          if (index + i < 6) {
            newOtp[index + i] = char;
          }
        });
        setOtp(newOtp);

        // Focus on the next empty field or last filled
        const nextIndex = Math.min(index + pasteData.length, 5);
        const focusIndex = newOtp.findIndex(
          (val, idx) => idx >= nextIndex && val === '',
        );
        if (focusIndex !== -1) {
          otpRefs.current[focusIndex]?.focus();
        } else {
          otpRefs.current[5]?.focus();
        }
        return;
      }
    }

    // Single digit input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-advance to next field
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  // Handle keydown for backspace and navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (otp[index] === '' && index > 0) {
        // Move to previous field if current is empty
        otpRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);

        // Clear previous field
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else if (otp[index] !== '') {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);

        if (index > 0) {
          otpRefs.current[index - 1]?.focus();
          setActiveIndex(index - 1);
        }
      }
    }

    // Arrow key navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }

    if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  // Handle focus
  const handleFocus = (index) => {
    setActiveIndex(index);
    otpRefs.current[index]?.select();
  };

  // Handle click on OTP container
  const handleOtpContainerClick = (e) => {
    // Find the first empty field or the last filled field
    const firstEmptyIndex = otp.findIndex((val) => val === '');
    const focusIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 5;
    otpRefs.current[focusIndex]?.focus();
  };

  // BACK
  const handleBack = () => {
    setStep(1);
    setOtp(new Array(6).fill(''));
    setActiveIndex(0);
  };

  // OTP VERIFY
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    try {
      const response = await verifyRegisterOtp({
        email,
        otp: otpCode,
      });

      const registrationToken = response?.data?.registrationToken;

      if (!registrationToken) {
        toast.error('Registration token missing. Please try again.');
        return;
      }

      COOKIE_STORAGE.setToken(registrationToken);

      navigate('/auth/register/setup-role');
      toast.success('Email verified successfully');
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Verification failed. Please try again.';
      toast.error(message);

      if (/otp|expired|invalid|unauthorized/i.test(String(message))) {
        setOtp(new Array(6).fill(''));
        // Focus first field after clearing
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
      console.error('OTP verification error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-10 object-contain"
                src="/images/icons/title.png"
                alt="Logo"
              />
              <h1 className="text-3xl font-bold text-gray-900">UnoSicurezza</h1>
            </div>

            <div className="mt-10 max-w-md">
              <img
                className="h-[500px] w-full object-contain"
                src={
                  step === 2 ? '/image/icon/otp.png' : '/image/icon/gmail.png'
                }
                alt="gmail icon"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center bg-[#F1F9F6] px-8 py-12 lg:px-20">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 rounded-full bg-amber-50 p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <GrClose className="text-xl" />
            </button>

            <div className="w-full max-w-md">
              <div className="mb-4">
                <Heading
                  level={4}
                  className="text-center"
                  h4={
                    step === 2
                      ? 'Enter the OTP sent to your email'
                      : 'Enter your email to register'
                  }
                />
                <div className="pt-2">
                  <p className="text-center">
                    You have an account?{' '}
                    <Link
                      to="/auth/login"
                      className="cursor-pointer text-[#73BFA1] hover:underline"
                    >
                      Login
                    </Link>{' '}
                  </p>
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={handleNextFromEmail}>
                  <Label className="mb-2 block text-lg font-medium">
                    E-mail
                  </Label>

                  <InputField
                    type="email"
                    value={email}
                    placeholder="Type Your Email"
                    className="focus:ring-opacity-20 rounded-2xl border border-green-100 bg-white px-4 py-3 transition-all focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1]"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />

                  <div className="mt-4 flex items-center justify-end gap-4">
                    <button
                      type="submit"
                      disabled={loading || !email}
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white transition-all hover:bg-white hover:text-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        'Go ahead'
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                  <p className="mb-8 text-center text-gray-600">
                    OTP sent to <strong>{email}</strong>
                  </p>

                  <div
                    className="flex cursor-text justify-center gap-3"
                    onClick={handleOtpContainerClick}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={() => handleFocus(index)}
                        className={`h-14 w-14 rounded-xl border-2 bg-white text-center text-xl font-medium transition-all duration-200 focus:outline-none ${digit ? 'border-[#73BFA1] bg-green-50' : 'border-gray-200'} ${activeIndex === index ? 'ring-opacity-20 scale-105 border-[#73BFA1] ring-2 ring-[#73BFA1]' : 'hover:border-gray-300'} `}
                        autoComplete="one-time-code"
                        pattern="\d*"
                      />
                    ))}
                  </div>

                  {/* Resend OTP */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await register({ email });
                          toast.success('OTP resent to your email');
                        } catch (error) {
                          toast.error(
                            'Failed to resend OTP. Please try again.',
                          );
                        }
                      }}
                      className="text-sm text-[#73BFA1] transition-colors hover:underline"
                    >
                      Didn't receive OTP? Resend
                    </button>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <IoIosArrowBack />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading || otp.some((digit) => digit === '')}
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white transition-all hover:bg-white hover:text-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Verifying...
                        </span>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
