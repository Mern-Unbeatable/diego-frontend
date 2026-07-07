import { Check, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  arFlagIcon,
  itFlagIcon,
  unFlagIcon,
  zhFlagIcon,
} from '../../assets/styles/FlagIcon';

const SUPPORTED_LANGUAGES = ['en', 'it', 'ar', 'zh'];

const LANGUAGE_LABELS = {
  en: 'English',
  it: 'Italiano',
  ar: 'العربية',
  zh: '中文',
};

const LANGUAGE_FLAGS = {
  en: unFlagIcon,
  it: itFlagIcon,
  ar: arFlagIcon,
  zh: zhFlagIcon,
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = i18n.language?.split('-')[0] || 'en';
  const activeLanguage = SUPPORTED_LANGUAGES.includes(currentLanguage)
    ? currentLanguage
    : 'en';

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-[#73BFA1] px-4 py-2 text-sm font-semibold text-[#73BFA1] transition hover:bg-[#EAF5F1] hover:shadow-md"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{LANGUAGE_LABELS[activeLanguage]}</span>
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#EAF5F1] ${
                lang === activeLanguage
                  ? 'bg-[#f1faf7] font-semibold text-[#73BFA1]'
                  : 'text-gray-700'
              }`}
              role="option"
              aria-selected={lang === activeLanguage}
            >
              <span className="text-lg">{LANGUAGE_FLAGS[lang]}</span>
              <span>{LANGUAGE_LABELS[lang]}</span>
              {lang === activeLanguage && (
                <Check className="ml-auto h-4 w-4 text-[#73BFA1]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
