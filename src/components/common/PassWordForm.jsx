import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H3 } from '../ui/Heading';
import Input from '../ui/Input';
import P from '../ui/P';
import { Heading, InputField } from '../ui';

const PassWordForm = ({
  navigatePath,
  heading = 'Enter your password',
  onSubmit,
}) => {
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('📩 Submitted Password:', password);

    if (onSubmit) {
      onSubmit(password);
    }
    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto grid h-screen grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="my-auto rounded-xl border border-gray-50 px-[92px]">
          <div className="flex justify-center text-center">
            <Heading level={3} className="max-w-[482px] text-center">
              Let's change the experience of learning something new.
            </Heading>
          </div>

          <div className="mx-auto max-w-md">
            <img
              className="h-auto w-full bg-cover object-cover"
              src="/image/icon/password.jpg"
              alt="Gmail Icon"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="mx-auto flex w-full flex-col justify-center rounded-xl border border-gray-50 bg-[#F1F9F6] px-[92px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-center text-center">
              <Heading className="text-center">{heading}</Heading>
            </div>

            <div className="mb-6">
              <InputField
                name="password"
                type="password"
                placeholder="Type Your Email"
                title="PassWord"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <Paragraph>Hai dimenticato la password?</Paragraph>
              <button
                type="submit"
                className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-[#73BFA1] lg:w-[20%]"
              >
                Go ahead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassWordForm;
