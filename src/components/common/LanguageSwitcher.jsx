import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'ar', label: '🇸🇦 العربية' },
  { code: 'zh', label: '🇨🇳 中文' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none"
    >
      {LANGS.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
