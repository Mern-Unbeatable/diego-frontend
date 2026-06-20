import { useState, useRef } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const VerifyEmailForm = ({
  navigatePath,
  heading = 'Verifica la tua e-mail',
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    console.log('Verify Submitted:', otpCode);

    if (onSubmit) {
      onSubmit(otpCode);
    }

    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  return (
    <div className="mx-auto grid h-screen w-full grid-cols-1 md:grid-cols-2">
      {/* Left Side - Logo and Video */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <img
              className="h-[91px] w-[104px]"
              src="/image/icon/droplogo.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <video
            className="h-auto w-full rounded-lg bg-cover object-cover"
            src="/image/icon/scI6BL1C040z0jeT22.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="flex items-center justify-center bg-[#F1F9F6]">
        <div className="relative p-12">
          {/* Back and Close buttons */}
          <button className="absolute top-6 left-6 text-gray-600 hover:text-gray-800">
            <IoMdArrowRoundBack />
          </button>
          <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-800">
            <GrClose />
          </button>

          <div className="mt-8 space-y-8">
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                {heading}
              </h2>
              <p className="mb-2 text-sm text-gray-600">
                Ti invierà il codice OTP all'indirizzo e-mail fornito
              </p>
              <p className="text-sm text-gray-600">
                Inserisci il codice di 4 cifre ricevuto
              </p>
            </div>

            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-14 rounded-lg border-2 border-gray-200 bg-white text-center text-2xl font-semibold transition-colors focus:border-[#73BFA1] focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-lg border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
            >
              Procedi
            </button>

            <div className="text-center text-sm">
              <button type="button" className="text-[#73BFA1] hover:underline">
                Non hai ricevuto il codice?
              </button>
              <span className="ml-2 text-gray-600">
                Invialo di nuovo (19 secondi)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
