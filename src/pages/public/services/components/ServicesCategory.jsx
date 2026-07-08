import { Container } from '../../../../components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ServicesCategory = ({ categories, loading }) => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-8 md:py-12">
      <Container className="container mx-auto">
        {loading ? (
          <p className="text-lg font-semibold text-[#2B2B2B]">
            {t('servicesPages.section2.loading')}
          </p>
        ) : (
          <div>
            <h2 className="mb-8 text-[32px] md:text-[38px] leading-none font-extrabold text-[#1F1F1F]">
              {t('servicesPages.section2.categoryTitle')}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-6  gap-4 md:gap-5">
              {categories.map((category) => {
                const hasValidPath =
                  typeof category.path === 'string' &&
                  category.path.trim().startsWith('/');

                const cardClassName =
                  'flex w-full flex-col items-center justify-start rounded-2xl border border-[#E5E5E5] bg-white px-3 py-5 text-left shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition';
                const interactiveClassName =
                  'hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#73BFA1] focus-visible:ring-offset-2';

                const cardContent = (
                  <>
                    <div className="flex h-[84px] w-[84px] items-center justify-center">
                      <img
                        className="h-full w-full object-contain"
                        src={category.image}
                        alt={category.title}
                      />
                    </div>
                    <p className="mt-3 text-center text-base leading-[1.2] font-bold text-[#1F1F1F]">
                      {category.title}
                    </p>
                  </>
                );

                return hasValidPath ? (
                  <Link
                    key={category.id}
                    to={category.path}
                    aria-label={`Open ${category.title} service`}
                    className={`${cardClassName} ${interactiveClassName}`}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    key={category.id}
                    className={`${cardClassName} cursor-not-allowed opacity-70`}
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServicesCategory;