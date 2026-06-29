import { useState, useRef } from 'react';
import { Heading, InputField, Label } from '../../components/ui';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  // STEP 1 → STEP 2 (EMAIL)
  const handleNextFromEmail = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Enter email first');
      return;
    }

    setStep(2);
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

  // OTP VERIFY (STATIC ONLY)
  const handleVerifyOtp = (e) => {
    console.log('OTP:', otp.join(''));
    navigate('/dashboard/super-admin');
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
            {/* Close Icon - Top Right */}
            <button
              onClick={() => navigate('/')} // or wherever you want to navigate
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
                  h4={
                    step === 2
                      ? 'Enter the OTP sent to your email'
                      : 'Scrivi la tua e-mail'
                  }
                />
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
                  />

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
                    >
                      Go ahead
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

                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="h-14 w-14 rounded-xl border border-green-100 bg-white text-center text-xl focus:border-[#73BFA1] focus:outline-none"
                      />
                    ))}
                  </div>

                  {/* BUTTONS */}
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
                      className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
                    >
                      Verify OTP
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
