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
    <Container className="my-20 items-center justify-center overflow-hidden md:flex md:gap-8">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2">
        <div className="space-y-6">
          {/* Title - matches "Condividi la tua recensione con noi" */}
          <Heading level={2} className="text-4xl font-bold tracking-tight">
            {t('homeView.section2.title')}
          </Heading>

          {/* Description - matches "Compila il modulo per condividere la tua esperienza. La tua recensione sarà visibile dopo l'approvazione." */}
          <Paragraph className="text-base text-slate-600">
            {t('homeView.section2.description')}
          </Paragraph>

          {/* Name field with asterisk */}
          <div className="mt-6">
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
          {/* Feedback section title - matches "Feedback sulla sessione" */}
          <Heading level={3} className="text-2xl font-semibold">
            {t('homeView.section2.feedbackTitle')}
          </Heading>

          {/* Rating section */}
          <div>
            <Paragraph className="mb-3 text-sm font-medium text-gray-700">
              {t('homeView.section2.rateExperience')}
            </Paragraph>
            <div className="flex items-center gap-4">
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

          {/* Comment section - matches "Lascia un commento" */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('homeView.section2.leaveComment')}
            </label>
            <TextAreaField
              id="feedback"
              name="textarea"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
              placeholder={t('homeView.section2.textAreaPlaceholder')}
              rows={4}
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          label={t('homeView.section2.submitButton')}
          size="lg"
          className="mt-2 w-full rounded-full bg-[#73BFA1] px-8 py-4 text-white hover:bg-[#5a9e85] focus:ring-2 focus:ring-[#73BFA1] focus:ring-offset-2 focus:outline-none"
        />
      </div>

      {/* Right side image - decorative element */}
      <div className="w-full md:mt-0 md:w-1/2">
        <div className="relative flex justify-end">
          {/* Green background shape */}
          <div className="h-[420px] w-[75%] max-w-[529px] bg-[#73BFA1] sm:h-[540px] md:h-[650px] lg:h-[600px] xl:h-[700px]" />

          {/* Image overlay */}
          <div className="absolute top-6 left-0 sm:top-8 md:top-10 md:left-4 lg:top-12 lg:left-16">
            <img
              src="./images/Componen.jpg"
              alt="Review illustration"
              className="h-auto w-[80vw] max-w-[500px] object-cover sm:w-[70vw] md:w-[420px] lg:w-[500px]"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReviewSection;
