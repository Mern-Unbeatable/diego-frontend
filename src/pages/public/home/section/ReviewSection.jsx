// import { useTranslation } from 'react-i18next';
// import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
// import Button from '../../../../components/ui/buttons/Buttons';
// import InputField from '../../../../components/ui/forms/InputField';
// import TextAreaField from '../../../../components/ui/forms/TextAreaField';
// import Paragraph from '../../../../components/ui/typography/Paragraph';
// import Container from '../../../../components/ui/layouts/Container';
// import Heading from '../../../../components/ui/typography/Heading';

// const ReviewSection = () => {
//   const { t } = useTranslation();

//   return (
//     <Container className="mb-20 items-center justify-center overflow-hidden md:flex md:gap-8">
//       <div className="w-full md:w-1/2">
//         <div className="space-y-6">
//           <Heading
//             level={2}
//             className="text-2xl font-bold text-[#1a1a1a] sm:text-3xl lg:text-4xl"
//           >
//             {t('homeView.section2.title')}
//           </Heading>

//           <Paragraph className="text-base text-slate-600">
//             {t('homeView.section2.description')}
//           </Paragraph>

//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               {t('homeView.section2.namePlaceholder')}{' '}
//               <span className="text-red-500">*</span>
//             </label>
//             <InputField
//               type="text"
//               name="name"
//               placeholder={t('homeView.section2.namePlaceholder')}
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="my-8 space-y-6">
//           <Heading level={3} className="text-2xl font-semibold">
//             {t('homeView.section2.feedbackTitle')}
//           </Heading>

//           <div>
//             <Paragraph className="mb-3 text-sm font-medium text-gray-700">
//               {t('homeView.section2.rateExperience')}
//             </Paragraph>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3, 4].map((star) => (
//                   <IoIosStar key={star} className="h-7 w-7 text-[#F2B700]" />
//                 ))}
//                 <IoIosStarOutline className="h-7 w-7 text-gray-300" />
//               </div>
//               <span className="text-sm text-slate-500">
//                 {t('homeView.section2.ratingText')}
//               </span>
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               {t('homeView.section2.leaveComment')}
//             </label>
//             <TextAreaField
//               id="feedback"
//               name="textarea"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
//               placeholder={t('homeView.section2.textAreaPlaceholder')}
//               rows={4}
//             />
//           </div>
//         </div>

//         <Button
//           label={t('homeView.section2.submitButton')}
//           size="lg"
//           className="mt-2 w-full rounded-full bg-[#73BFA1] px-8 py-4 text-white hover:bg-[#5a9e85] focus:ring-2 focus:ring-[#73BFA1] focus:ring-offset-2 focus:outline-none"
//         />
//       </div>

//       <div className="w-full md:mt-0 md:w-1/2">
//         <div className="relative flex justify-end">
//           <div className="h-[420px] w-[70%] max-w-[450px] rounded-2xl bg-[#73BFA1] sm:h-[40px] md:h-[450px] lg:h-[450]" />

//           <div className="absolute top-6 left-0 sm:top-8 md:top-10 md:left-4 lg:-top-22 lg:left-16">
//             <img
//               src="./images/Rectangle.png"
//               alt="Review illustration"
//               className="h-auto w-[80vw] max-w-[450px] rounded-2xl object-cover sm:h-[40px] md:h-[450px] lg:h-[450]"
//             />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ReviewSection;

import { useTranslation } from 'react-i18next';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import Button from '../../../../components/ui/buttons/Buttons';
import InputField from '../../../../components/ui/forms/InputField';
import TextAreaField from '../../../../components/ui/forms/TextAreaField';
import Paragraph from '../../../../components/ui/typography/Paragraph';
import Container from '../../../../components/ui/layouts/Container';
import Heading from '../../../../components/ui/typography/Heading';

const ReviewSection = () => {
  const { t } = useTranslation();

  return (
    <Container className="mb-14 flex flex-col items-center gap-12 overflow-hidden md:mb-20  lg:flex-row lg:items-center lg:gap-16">
      <div className="w-full lg:w-1/2">
        <div className="space-y-6">
          <Heading
            level={2}
            className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl"
          >
            {t('homeView.section2.title')}
          </Heading>

          <Paragraph className="text-sm leading-7 text-slate-600 sm:text-base">
            {t('homeView.section2.description')}
          </Paragraph>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('homeView.section2.namePlaceholder')}{' '}
              <span className="text-red-500">*</span>
            </label>

            <InputField
              type="text"
              name="name"
              placeholder={t('homeView.section2.namePlaceholder')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
            />
          </div>
        </div>

        <div className="my-8 space-y-6">
          <Heading level={3} className="text-xl font-semibold sm:text-2xl">
            {t('homeView.section2.feedbackTitle')}
          </Heading>

          <div>
            <Paragraph className="mb-3 text-sm font-medium text-gray-700">
              {t('homeView.section2.rateExperience')}
            </Paragraph>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <IoIosStar key={star} className="h-7 w-7 text-[#F2B700]" />
                ))}
                <IoIosStarOutline className="h-7 w-7 text-gray-300" />
              </div>

              <span className="text-sm text-slate-500">
                {t('homeView.section2.ratingText')}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('homeView.section2.leaveComment')}
            </label>

            <TextAreaField
              id="feedback"
              name="textarea"
              rows={4}
              placeholder={t('homeView.section2.textAreaPlaceholder')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
            />
          </div>
        </div>

        <Button
          label={t('homeView.section2.submitButton')}
          size="lg"
          className="mt-2 w-full rounded-full bg-[#73BFA1] py-4 text-white transition hover:bg-[#5a9e85] focus:ring-2 focus:ring-[#73BFA1] focus:ring-offset-2 focus:outline-none"
        />
      </div>

      <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
        <div className="relative w-full max-w-[520px]">
          <div className="ml-auto h-[260px] w-[85%] rounded-2xl bg-[#73BFA1] sm:h-[320px] md:h-[420px] lg:h-[500px]" />

          <img
            src="./images/Rectangle.png"
            alt="Review illustration"
            className="relative -mt-57 w-[85%] rounded-2xl object-cover shadow-xl sm:-mt-64 sm:w-[80%] md:-mt-80 md:w-[82%] lg:absolute lg:bottom-10 lg:left-4 lg:mt-0 lg:w-[80%]"
          />
        </div>
      </div>
    </Container>
  );
};

export default ReviewSection;
