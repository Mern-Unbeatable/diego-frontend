import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { Check, Copy } from 'lucide-react';
import { Heading, InputField, Label } from '../../components/ui';
import { useAuth } from '../../features/auth/authHooks';
import COOKIE_STORAGE from '../../utils/cookies/cookieStorage';
import { getDashboardPath } from '../../utils/auth/authUtils';
import toast from 'react-hot-toast';
const LoginView = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [step, setStep] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedOtp, setCopiedOtp] = useState(false);

  const otpRefs = useRef([]);

  const { login, loading, verifyLoginOtp, loginOtp, resetLoginOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  // Auto-focus first input on OTP step
  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  // STEP 1 → STEP 2 (EMAIL)
  const handleNextFromEmail = async (e) => {
    e.preventDefault();

    try {
      await login({ email });
      toast.success('OTP sent to your email');
      setStep(2);
    } catch (error) {
      toast.error('Please check your email and try again.');
      console.error('Login error:', error);
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
      //
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
    setCopiedOtp(false);
    resetLoginOtp();
  };

  const handleCopyOtp = async () => {
    if (!loginOtp) return;

    try {
      await navigator.clipboard.writeText(String(loginOtp));
      setCopiedOtp(true);
      toast.success('OTP copied to clipboard');
      setTimeout(() => setCopiedOtp(false), 2000);
    } catch {
      toast.error('Failed to copy OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      await login({ email });
      toast.success('OTP resent to your email');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', error);
    }
  };

  // OTP VERIFY
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    try {
      const response = await verifyLoginOtp({
        email: email,
        otp: otpString,
      });

      COOKIE_STORAGE.clearAll();
      COOKIE_STORAGE.setUser(response.data.user.level);
      COOKIE_STORAGE.setToken(response.data.accessToken);

      const userRole = response.data.user.level;
      const targetPath =
        redirectPath || getDashboardPath(userRole) || '/login';

      navigate(targetPath);
      toast.success('Successfully verified!');
    } catch (error) {
      toast.error('Verification failed. Please try again.');
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
            {/* Close Icon - Top Right */}
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 rounded-full bg-amber-50 p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <GrClose className="text-xl" />
            </button>

            <div className="w-full max-w-md">
              {/* TITLE */}
              <div className="mb-4">
                <Heading
                  level={4}
                  className="text-center"
                  h4={step === 2 ? 'Enter the OTP' : 'Scrivi la tua e-mail'}
                />

                {step === 2 ? (
                  ''
                ) : (
                  <div className="pt-2">
                    <p className="text-center">
                      You don't have an account?{' '}
                      <Link
                        to="/auth/register"
                        className="cursor-pointer text-[#73BFA1] hover:underline"
                      >
                        Sginup
                      </Link>{' '}
                    </p>
                  </div>
                )}
              </div>

              {/* EMAIL STEP */}
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

                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading || !email}
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white transition-colors hover:bg-white hover:text-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Go ahead'}
                    </button>
                  </div>
                </form>
              )}

              {/* OTP STEP */}
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
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={() => handleFocus(index)}
                        className={`md:h-14 md:w-14 h-10 w-10 rounded-xl border-2 bg-white text-center text-xl font-medium transition-all duration-200 focus:outline-none ${digit ? 'border-[#73BFA1] bg-green-50' : 'border-gray-200'} ${activeIndex === index ? 'ring-opacity-20 scale-105 border-[#73BFA1] ring-2 ring-[#73BFA1]' : 'hover:border-gray-300'} `}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    ))}
                  </div>

                  {/* Resend OTP */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Didn't receive OTP?{' '}
                      <strong className="text-[#73BFA1] hover:underline">
                        Resend
                      </strong>
                    </button>
                  </div>

                  {/* BUTTONS */}
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
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white transition-colors hover:bg-white hover:text-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>

                  {loginOtp && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyOtp}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#73BFA1]/30 bg-white px-4 py-2 font-mono text-lg tracking-[0.3em] text-gray-900 transition-colors hover:bg-[#F1F9F6]"
                        title="Click to copy OTP"
                      >
                        <span>{loginOtp}</span>
                        {copiedOtp ? (
                          <Check className="h-4 w-4 text-[#73BFA1]" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
