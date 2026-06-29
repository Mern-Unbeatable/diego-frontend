import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Paragraph } from '../../components/ui';
import { GrClose } from 'react-icons/gr';

const LANGUAGES = [
  { code: 'en', title: 'English', img: '/image/icon/lang-uk.png' },
  { code: 'it', title: 'Italiano', img: '/image/icon/lang-it.png' },
  { code: 'ar', title: 'العربية', img: '/image/icon/lang-ar.png' },
  { code: 'zh', title: '中文', img: '/image/icon/lang-cn.png' },
];

const LanguageView = () => {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-2">
            {/* Left Section */}

            {/* Close Icon - Top Right of Entire Card */}
            <button
              onClick={() => navigate('/')}
              className="absolute top-5 right-5 z-10 rounded-full bg-white p-2 text-gray-400 shadow transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <GrClose className="text-lg" />
            </button>

            <div className="flex flex-col items-center justify-center p-8 lg:p-16">
              <Link to="/" className="min-w-0 shrink">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    className="h-8 w-8 object-contain text-[#46BB9D] sm:h-16 sm:w-16"
                    src="/images/icons/title.png"
                    alt="Home"
                  />

                  <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl lg:text-4xl">
                    UnoSicurezza
                  </h1>
                </div>
              </Link>

              <div className="mt-8 max-w-md">
                <img
                  className="w-full object-contain"
                  src="/image/icon/authentication.jpg"
                  alt="Learning illustration"
                />
              </div>
            </div>

            {/* Right Section */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center bg-[#F1F9F6] px-6 py-10 md:px-10 lg:px-20"
            >
              <div className="w-full max-w-md">
                <Heading
                  level={4}
                  className="mb-10 text-center"
                  h4="Scegli la lingua che preferisci"
                />

                <div className="grid grid-cols-2 gap-5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`relative h-40 rounded-2xl border-2 bg-white p-5 transition-all duration-300 hover:scale-105 ${
                        selected === lang.code
                          ? 'border-[#73BFA1] shadow-md shadow-[#73BFA1]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* Check Icon */}
                      <div className="absolute top-3 right-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                            selected === lang.code
                              ? 'bg-[#73BFA1]'
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
                    className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-8 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1]/50 focus:outline-none"
                  >
                    Go ahead
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageView;
