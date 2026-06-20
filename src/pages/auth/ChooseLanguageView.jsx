import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Paragraph } from '../../components/ui';

const LANGUAGES = [
  { code: 'en', title: 'English', img: '/image/icon/lang-uk.png' },
  { code: 'it', title: 'Italiano', img: '/image/icon/lang-it.png' },
  { code: 'ar', title: 'العربية', img: '/image/icon/lang-ar.png' },
  { code: 'zh', title: '中文', img: '/image/icon/lang-cn.png' },
];

const ChooseLanguageView = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(i18n.language || 'it');

  useEffect(() => {
    setSelected(i18n.language);
  }, [i18n.language]);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setSelected(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/auth/register');
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-2">

          {/* Left Section */}
          <div className="flex flex-col items-center justify-center p-8 lg:p-16">
            <Heading level={3} className="text-center">
              Let's change the experience of learning
              <br />
              something new.
            </Heading>

            <div className="mt-8 max-w-md">
              <img
                className="w-full object-contain"
                src="/image/icon/authentication.jpg"
                alt="Learning illustration"
              />
            </div>

            <Paragraph className="mt-6 text-center">
              Our journey to ensure quality education for all at low cost.
            </Paragraph>
          </div>

          {/* Right Section */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[#F1F9F6] px-6 py-10 md:px-10 lg:px-20"
          >
            <div className="w-full">
              <Heading
                level={3}
                className="mb-10 text-center"
                h3="Choose a preferred language"
              />

              <div className="grid grid-cols-2 gap-5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`relative rounded-2xl border-2 bg-white p-5 transition-all h-40
                  ${selected === lang.code
                        ? 'border-emerald-400 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {/* Check Icon */}
                    <div className="absolute right-3 top-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${selected === lang.code
                          ? 'bg-emerald-400'
                          : 'bg-gray-200'
                          }`}
                      >
                        {selected === lang.code && (
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

                    <div className="flex h-full flex-col items-center justify-center">
                      <img
                        src={lang.img}
                        alt={lang.title}
                        className="h-16 w-16 object-contain"
                      />

                      <h4 className="mt-4 text-lg font-medium text-gray-900">
                        {lang.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>

              {/* Button */}
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-8 py-3 font-medium text-white transition-all hover:bg-white hover:text-[#73BFA1]"
                >
                  Go ahead
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChooseLanguageView;
