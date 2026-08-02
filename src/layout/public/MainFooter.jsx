import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MainFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#000000] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl lg:px-[32px]">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo Section */}
          <div className="">
            <img
              className="h-auto w-full bg-[#000000] bg-cover object-cover text-[#46BB9D]"
              src="/images/icons/Group@2x.png"
              alt=""
            />
          </div>

          {/* Main Links Grid */}
          <div className="col-span-4 grid grid-cols-2 gap-6 lg:gap-10 md:grid-cols-4">
            {/* Prodotto Column */}
            <div className="col-span-1 gap-4 lg:gap-[32px] text-white">
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.product', { defaultValue: 'Prodotto' })}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <Link
                    to="/services"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.overview', { defaultValue: 'Panoramica' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.features', { defaultValue: 'Caratteristiche' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.solutions', { defaultValue: 'Soluzioni' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/courses/how-it-works"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.tutorial', { defaultValue: 'Esercitazione' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/courses/catalog"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.pricing', { defaultValue: 'Prezzi' })}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Azienda Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.company', { defaultValue: 'Azienda' })}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <Link
                    to="/who_we_are"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.whoWeAre', { defaultValue: 'Chi siamo' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.course', { defaultValue: 'Corso' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.news', { defaultValue: 'Notizia' })}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sociale Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.social', { defaultValue: 'Sociale' })}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legale Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.legal', { defaultValue: 'Legale' })}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <Link
                    to="/contact_us"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.terms', { defaultValue: 'Termini' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact_us"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.privacy', { defaultValue: 'Privacy' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact_us"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.cookies', { defaultValue: 'Biscotti' })}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact_us"
                    className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
                  >
                    {t('footer.contact', { defaultValue: 'Contatto' })}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="mt-5 items-center justify-between px-6 md:flex md:pt-8">
          {/* Copyright */}
          <p className="mb-2 text-sm text-gray-400">
            {t('footer.copyright', {
              defaultValue: '© 2022 UnoSicurezza. All rights reserved.',
            })}
          </p>
          <div className="">
            <h3 className="mb-4 text-base font-semibold text-white">
              {t('footer.downloadApp', { defaultValue: 'Download App' })}
            </h3>
            <div className="mr-24 mb-8 flex gap-4">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
