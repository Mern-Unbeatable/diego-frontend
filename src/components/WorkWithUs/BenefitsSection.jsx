// import { CheckCircle, Zap, Settings, BookOpen, Shield } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// export default function CollaborationBenefits() {
//   const { t } = useTranslation();

//   const benefits = [
//     {
//       id: 1,
//       icon: Zap,
//       title: t('workWithUs.section3.benefit1Title'),
//       description: t('workWithUs.section3.benefit1Desc'),
//     },
//     {
//       id: 2,
//       icon: Settings,
//       title: t('workWithUs.section3.benefit2Title'),
//       description: t('workWithUs.section3.benefit2Desc'),
//     },
//     {
//       id: 3,
//       icon: BookOpen,
//       title: t('workWithUs.section3.benefit3Title'),
//       description: t('workWithUs.section3.benefit3Desc'),
//     },
//     {
//       id: 4,
//       icon: Shield,
//       title: t('workWithUs.section3.benefit4Title'),
//       description: t('workWithUs.section3.benefit4Desc'),
//     },
//   ];

//   const licenseFeatures = [
//     t('workWithUs.section3.feature1'),
//     t('workWithUs.section3.feature2'),
//     t('workWithUs.section3.feature3'),
//     t('workWithUs.section3.feature4'),
//     t('workWithUs.section3.feature5'),
//   ];

//   return (
//     <div className="w-full bg-gradient-to-r from-[#FAFAFA] to-blue-50 px-4 py-16 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <h1 className="mb-6 text-4xl font-bold text-gray-900">
//               {t('workWithUs.section3.title')}
//             </h1>

//             <p className="mb-12 leading-relaxed text-gray-600">
//               {t('workWithUs.section3.description')}
//             </p>

//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//               {benefits.map((benefit) => {
//                 const IconComponent = benefit.icon;
//                 return (
//                   <div key={benefit.id} className="flex gap-4">
//                     <div className="flex-shrink-0">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
//                         <IconComponent
//                           className="h-6 w-6 text-teal-600"
//                           strokeWidth={2}
//                         />
//                       </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                       <div className="sticky top-20 rounded-lg border border-teal-200 bg-white p-8">
//                         <h2 className="mb-6 text-xl font-bold text-gray-900">
//                           {t('workWithUs.section3.licenseTitle')}
//                         </h2>

//                         <ul className="mb-8 space-y-4">
//                           {licenseFeatures.map((feature, index) => (
//                             <li key={index} className="flex items-start gap-3">
//                               <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
//                               <span className="text-sm leading-relaxed text-gray-700">
//                                 {feature}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>

//                         <div className="border-t border-teal-200 pt-6">
//                           <p className="text-center text-sm font-medium text-gray-600">
//                             {t('workWithUs.section3.compliance')}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="sticky top-20 rounded-lg border border-teal-200 bg-white p-8">
//               <h2 className="mb-6 text-xl font-bold text-gray-900">
//                 {t('workWithUs.section3.licenseTitle')}
//               </h2>

//               <ul className="mb-8 space-y-4">
//                 {licenseFeatures.map((feature, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
//                     <span className="text-sm leading-relaxed text-gray-700">
//                       {feature}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="border-t border-teal-200 pt-6">
//                 <p className="text-center text-xs font-medium text-gray-600">
//                   {t('workWithUs.section3.compliance')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { CheckCircle, Rocket, Globe, Upload, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CollaborationBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      id: 1,
      icon: Rocket,
      title: t('workWithUs.section3.benefit1Title'),
      description: t('workWithUs.section3.benefit1Desc'),
    },
    {
      id: 2,
      icon: Globe,
      title: t('workWithUs.section3.benefit2Title'),
      description: t('workWithUs.section3.benefit2Desc'),
    },
    {
      id: 3,
      icon: Upload,
      title: t('workWithUs.section3.benefit3Title'),
      description: t('workWithUs.section3.benefit3Desc'),
    },
    {
      id: 4,
      icon: FileCheck,
      title: t('workWithUs.section3.benefit4Title'),
      description: t('workWithUs.section3.benefit4Desc'),
    },
  ];

  const licenseFeatures = [
    t('workWithUs.section3.feature1'),
    t('workWithUs.section3.feature2'),
    t('workWithUs.section3.feature3'),
    t('workWithUs.section3.feature4'),
    t('workWithUs.section3.feature5'),
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('workWithUs.section3.title')}
            </h1>

            <p className="mb-12 max-w-2xl leading-relaxed text-gray-500">
              {t('workWithUs.section3.description')}
            </p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                        <IconComponent
                          className="h-5 w-5 text-teal-600"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - License Model Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-teal-100 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                {t('workWithUs.section3.licenseTitle')}
              </h2>

              <ul className="mb-8 space-y-4">
                {licenseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                    <span className="text-sm leading-relaxed text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-teal-50/60 py-3">
                <p className="text-center text-sm font-medium text-gray-600">
                  {t('workWithUs.section3.compliance')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}