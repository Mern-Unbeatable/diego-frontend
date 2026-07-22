import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import toast from 'react-hot-toast';
import Button from '../../../../components/ui/buttons/Buttons';
import InputField from '../../../../components/ui/forms/InputField';
import TextAreaField from '../../../../components/ui/forms/TextAreaField';
import Paragraph from '../../../../components/ui/typography/Paragraph';
import Container from '../../../../components/ui/layouts/Container';
import Heading from '../../../../components/ui/typography/Heading';
import { useReview } from '../../../../features/public/review/reviewHooks';

const buildLocalizedField = (value) => ({
  en: value,
  it: value,
  fr: value,
});

const ReviewSection = () => {
  const { t } = useTranslation();
  const { createReview, loading } = useReview();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName) {
      toast.error(t('homeView.section2.nameRequired'));
      return;
    }

    if (rating < 1) {
      toast.error(t('homeView.section2.ratingRequired'));
      return;
    }

    try {
      const payload = {
        name: buildLocalizedField(trimmedName),
        rating,
      };

      if (trimmedComment) {
        payload.comment = buildLocalizedField(trimmedComment);
      }

      await createReview(payload);

      toast.success(t('homeView.section2.successAlert'));
      setName('');
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(t('homeView.section2.errorAlert'));
    }
  };

  return (
    <Container className="mb-14 flex flex-col items-center gap-12 overflow-hidden md:mb-20 lg:flex-row lg:items-center lg:gap-16">
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = starValue <= rating;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      aria-label={t('homeView.section2.selectRating', {
                        rating: starValue,
                      })}
                      className="rounded-sm transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F2B700]/40"
                    >
                      {isFilled ? (
                        <IoIosStar className="h-7 w-7 text-[#F2B700]" />
                      ) : (
                        <IoIosStarOutline className="h-7 w-7 text-gray-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              <span className="text-sm text-slate-500">
                {rating > 0
                  ? t('homeView.section2.ratingTextSelected', { rating })
                  : t('homeView.section2.ratingText')}
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
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={t('homeView.section2.textAreaPlaceholder')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#73BFA1] focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
            />
          </div>
        </div>

        <Button
          label={t('homeView.section2.submitButton')}
          size="lg"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
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
