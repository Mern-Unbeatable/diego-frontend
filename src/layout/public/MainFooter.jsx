// const MainFooter = () => {
//   return (
//     <footer className="bg-[#000000] px-6 py-12 text-white">
//       <div className="mx-auto max-w-7xl px-[32px]">
//         <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-5">
//           {/* Logo Section */}
//           <div className="">
//             <img
//               className="h-auto w-full bg-[#000000] bg-cover object-cover text-[#46BB9D]"
//               src="/images/icons/Group@2x.png"
//               alt=""
//             />
//           </div>

//           {/* Main Links Grid Fixed */}
//           <div className="col-span-4 grid grid-cols-2 gap-10 md:grid-cols-4">
//             {/* Prodotto Column */}
//             <div className="col-span-1 gap-[32px] text-white">
//               <h3 className="mb-4 text-base font-semibold text-white">
//                 Prodotto
//               </h3>
//               <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Panoramica
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Caratteristiche
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Soluzioni
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Esercitazione
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Prezzi
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Azienda Column */}
//             <div>
//               <h3 className="mb-4 text-base font-semibold text-white">
//                 Azienda
//               </h3>
//               <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Chi siamo
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Corso
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Notizia
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Sociale Column */}
//             <div>
//               <h3 className="mb-4 text-base font-semibold text-white">
//                 Sociale
//               </h3>
//               <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Legale Column */}
//             <div>
//               <h3 className="mb-4 text-base font-semibold text-white">
//                 Legale
//               </h3>
//               <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Termini
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Privacy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Biscotti
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href=""
//                     className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]"
//                   >
//                     Contatto
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Download App Section */}
//         <div className="mt-5 items-center justify-between px-6 md:flex md:pt-8">
//           {/* Copyright */}
//           <p className="mb-2 text-sm text-gray-400">
//             © 2022 UnoSicurezza. All rights reserved.
//           </p>
//           <div className="">
//             <h3 className="mb-4 text-base font-semibold text-white">
//               Download App
//             </h3>
//             <div className="mr-24 mb-8 flex gap-4">
//               <a href="" className="transition-opacity hover:opacity-80">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                   alt="Get it on Google Play"
//                   className="h-12"
//                 />
//               </a>
//               <a href="" className="transition-opacity hover:opacity-80">
//                 <img
//                   src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                   alt="Download on the App Store"
//                   className="h-12"
//                 />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default MainFooter;

import { useTranslation } from 'react-i18next';

const MainFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#000000] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl px-[32px]">
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
          <div className="col-span-4 grid grid-cols-2 gap-10 md:grid-cols-4">
            {/* Prodotto Column */}
            <div className="col-span-1 gap-[32px] text-white">
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.product')}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.overview')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.features')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.solutions')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.tutorial')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.pricing')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Azienda Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.company')}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.whoWeAre')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.course')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.news')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Sociale Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.social')}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legale Column */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {t('footer.legal')}
              </h3>
              <ul className="space-y-2 text-base font-bold text-[#EAECF0]">
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.terms')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.privacy')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.cookies')}
                  </a>
                </li>
                <li>
                  <a href="" className="border-b border-transparent pb-[2px] transition-all duration-200 hover:border-[#4ba581] hover:text-[#4ba581]">
                    {t('footer.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="mt-5 items-center justify-between px-6 md:flex md:pt-8">
          {/* Copyright */}
          <p className="mb-2 text-sm text-gray-400">
            {t('footer.copyright')}
          </p>
          <div className="">
            <h3 className="mb-4 text-base font-semibold text-white">
              {t('footer.downloadApp')}
            </h3>
            <div className="mr-24 mb-8 flex gap-4">
              <a href="" className="transition-opacity hover:opacity-80">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a href="" className="transition-opacity hover:opacity-80">
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