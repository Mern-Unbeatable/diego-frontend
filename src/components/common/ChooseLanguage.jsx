import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import P from '../ui/P';
import { H3 } from '../ui/Heading';

const languages = [
  { id: 1, img: '/image/icon/alphabet1.jpg', title: 'English' },
  { id: 2, img: '/image/icon/alphabet2.jpg', title: 'Italiano' },
  { id: 3, img: '/image/icon/alphabet3.jpg', title: 'Arabic' },
  { id: 4, img: '/image/icon/alphabet4.jpg', title: 'China' },
];

const ChooseLanguage = ({ onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Italiano');
  const navigate = useNavigate();

  const handleSubmitLanguage = (e) => {
    e.preventDefault();
    console.log({ language: selectedLanguage });
    if (onSelectLanguage) {
      onSelectLanguage(selectedLanguage);
    }
    navigate('');
  };

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto grid h-screen grid-cols-1 gap-3 md:grid-cols-2">
        {/* Left Side */}
        <div className="my-auto rounded-xl border border-gray-50 px-[92px]">
          <div className="flex justify-center text-center">
            <H3
              className={'max-w-[482px] text-center'}
              h3={"Let's change the experience of learning something new."}
            />
          </div>
          <div className="mx-auto w-full lg:w-[500px]">
            <img
              className="h-auto w-full bg-cover object-cover"
              src="/image/icon/authentication.jpg"
              alt=""
            />
          </div>
          <P
            className={'text-center'}
            p={'Our journey to ensure quality education for all at low cost'}
          />
        </div>

        <form
          onSubmit={handleSubmitLanguage}
          className="flex flex-col justify-center rounded-xl border border-gray-50 bg-[#F1F9F6] px-[22px] py-[48px] md:px-[28px] lg:px-[92px]"
        >
          <div className="flex justify-center text-center">
            <H3
              className={'mb-6 text-center sm:mb-8 md:mb-12'}
              h3={'Choose a preferred language'}
            />
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 md:gap-7">
            {languages.map((lng) => (
              <button
                key={lng.id}
                type="button"
                onClick={() => setSelectedLanguage(lng.title)}
                className={`relative h-36 rounded-2xl border-2 bg-white p-5 transition-all hover:border-gray-300 sm:h-40 md:h-48 ${
                  selectedLanguage === lng.title
                    ? 'border-emerald-400'
                    : 'border-gray-200'
                }`}
              >
                <div className="absolute top-3 right-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      selectedLanguage === lng.title
                        ? 'bg-emerald-400'
                        : 'bg-gray-200'
                    }`}
                  >
                    {selectedLanguage === lng.title && (
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="mb-4 flex justify-center">
                  <img
                    src={lng.img}
                    alt={lng.title}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <h4 className="text-lg font-medium text-gray-900">
                  {lng.title}
                </h4>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1] lg:w-[30%]"
            >
              Go ahead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChooseLanguage;
