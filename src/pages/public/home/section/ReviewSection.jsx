import Button from '../../../../components/ui/buttons/Buttons';
import InputField from '../../../../components/ui/forms/InputField';
import TextAreaField from '../../../../components/ui/forms/TextAreaField';
import Paragraph from '../../../../components/ui/typography/Paragraph';
import Container from '../../../../components/ui/layouts/Container';
import Heading from '../../../../components/ui/typography/Heading';
import { useTranslation } from 'react-i18next';


const ReviewSection = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-20 items-center justify-center overflow-hidden md:flex md:gap-8">
      <Container className="w-full md:w-1/2">
        <div className="space-y-8">
          <Heading level={3} className="">
            {t('homeView.section2.title')}
          </Heading>
          <Paragraph className="">
            {t('homeView.section2.description')}
          </Paragraph>
          <InputField
            title="name"
            type="text"
            name="name"
            placeholder={t('homeView.section2.namePlaceholder')}
          />
        </div>
        <div className="my-5 space-y-8">
          <Heading level={3} className="">
            {t('homeView.section2.feedbackTitle')}
          </Heading>
          <div className="space-y-4">
            <Paragraph>{t('homeView.section2.leaveComment')}</Paragraph>
            <Paragraph>{t('homeView.section2.rateExperience')}</Paragraph>
            <Paragraph>{t('homeView.section2.ratingText')}</Paragraph>
          </div>

          <TextAreaField
            id={t('homeView.section2.leaveComment')}
            title={t('homeView.section2.leaveComment')}
            name="textarea"
            className=""
            placeholder={t('homeView.section2.textAreaPlaceholder')}
          />
        </div>
        <Button label={t('homeView.section2.submitButton')} size="lg" className="w-full" />
      </Container>

      <div className="mt-10 flex w-full justify-center md:mt-0 md:w-1/2">
        <div className="relative w-full max-w-[560px]">
          <div
            className="
      ml-auto
      h-[420px]
      w-[75%]
      max-w-[529px]
      bg-[#73BFA1]

      sm:h-[540px]
      md:h-[650px]
      lg:h-[800px]
      xl:h-[900px]
      "
          />

          <div
            className="
      absolute
      left-0
      top-6
      sm:top-8
      md:left-4 md:top-10
      lg:left-8 lg:top-16
      "
          >
            <img
              src="./images/Componen.jpg"
              alt=""
              className="
        w-[80vw]
        max-w-[500px]
        h-auto
        object-cover

        sm:w-[70vw]
        md:w-[420px]
        lg:w-[500px]
        "
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReviewSection;
