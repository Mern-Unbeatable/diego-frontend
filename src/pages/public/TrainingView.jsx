import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import { useTranslation } from 'react-i18next';

const TrainingView = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-20">
      <Container className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="max-w-2xl">
            <h1 className="l max-w-xl text-3xl leading-tight font-semibold text-[#555b5d] sm:text-4xl">
              {t('trainingPages.section13.title')}
            </h1>

            <p className="mt-5 max-w-xl text-justify text-[15px] leading-7 text-[#7a7f80] sm:text-base">
              {t('trainingPages.section13.description')}
            </p>

            <h2 className="mt-8 text-2xl leading-tight font-semibold text-[#555b5d] sm:text-3xl lg:text-[32px]">
              {t('trainingPages.section13.whyTitle')}
            </h2>

            <p className="mt-4 max-w-xl text-justify text-[15px] leading-7 text-[#7a7f80] sm:text-base">
              {t('trainingPages.section13.whyDescription')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={'/training/courses/catalog'}
                className="inline-flex items-center justify-center rounded-full bg-[#73bfa1] px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#63b291]"
              >
                {' '}
                {t('trainingPages.section13.goToCatalog')}
              </Link>

              <Link
               to={"/"}
                className="inline-flex items-center justify-center rounded-full border border-[#2f3133] bg-white px-6 py-3 text-sm font-medium text-[#2f3133] transition-colors duration-200 hover:border-[#73bfa1] hover:text-[#73bfa1]"
              >
                {t('trainingPages.section13.platformDetails')}
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border-4 border-[#d8ede6] bg-[#d8ede6] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="overflow-hidden rounded-[18px] bg-[#eef6f2]">
                  <img
                    src="/image/home/banner/image22.jpg"
                    alt="Training participant working at a laptop"
                    className="h-full min-h-[180px] w-full object-cover sm:min-h-[220px]"
                  />
                </div>

                <div className="overflow-hidden rounded-[18px] bg-[#eef6f2]">
                  <img
                    src="/image/course/course4.png"
                    alt="People collaborating in a training session"
                    className="h-full min-h-[180px] w-full object-cover sm:min-h-[220px]"
                  />
                </div>

                <div className="col-span-2 overflow-hidden rounded-[18px] bg-[#eef6f2]">
                  <img
                    src="/image/mandatory_courses/image6.jpg"
                    alt="Group discussion during workplace training"
                    className="h-full min-h-[205px] w-full object-cover sm:min-h-[270px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrainingView;
