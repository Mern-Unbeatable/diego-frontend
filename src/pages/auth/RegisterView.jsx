import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const otpRefs = useRef([]);

  const { register, loading, verifyRegisterOtp } = useAuth();

  const navigate = useNavigate();

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

  // OTP change
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // BACK
  const handleBack = () => {
    setStep(1);
    setOtp(new Array(6).fill(''));
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
      }
      console.error('OTP verification error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col items-center justify-center bg-white p-10">
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
                className="w-full object-contain"
                src={
                  step === 2
                    ? '/image/icon/otp.png'
                    : '/image/icon/password.jpg'
                }
                alt=""
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
                    className="rounded-2xl border border-green-100 bg-white px-4 py-3"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="mt-8 flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/auth/login')}
                      className="text-sm text-gray-600 hover:text-[#73BFA1]"
                    >
                      Already have an account? Login
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1] disabled:opacity-60"
                    >
                      {loading ? 'Loading...' : 'Go ahead'}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                  <p className="mb-8 text-center text-gray-600">
                    OTP sent to <strong>{email}</strong>
                  </p>

                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="h-14 w-14 rounded-xl border border-green-100 bg-white text-center text-xl focus:border-[#73BFA1] focus:outline-none"
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-600"
                    >
                      <IoIosArrowBack />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1] disabled:opacity-60"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
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
