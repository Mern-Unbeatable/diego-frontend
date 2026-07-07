import { useTranslation } from 'react-i18next';
import Banner from '../../components/common/Banner';
import Container from '../../components/ui/layouts/Container';
import banner from '../../../src/assets/images/banner/whoweare/banner.png';
import PillarsCards from '../../components/WhoWeAre/PillarsCards';
import MissionCards from '../../components/WhoWeAre/MissionCards';

const ChiSiamo = () => {
  const { t } = useTranslation();

  return (
    <Container size="full">
      <div className="w-full bg-white">
        <Banner image={banner} title={t('chiSiamo.section1.bannerTitle')} />

        {/* Header Section */}
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center gap-12">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-6 flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-[#73bfa1]">
                  {/* <span className="text-sm font-bold text-white">S</span> */}
                  <img src="/images/Vector.png" alt="logo" className="w-8 h-8" />
                </div>
                <p className="text-sm leading-relaxed text-gray-700 text-justify">
                  {t('chiSiamo.section1.intro')}
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-gray-700 text-justify">
                <div>
                  <p className="mb-2 font-semibold">
                    {t('chiSiamo.section1.objectiveLabel')}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">
                    {t('chiSiamo.section1.whatWeDoLabel')}
                  </h3>
                  <p>
                    <strong>{t('chiSiamo.section1.formazione')}</strong>{' '}
                    {t('chiSiamo.section1.formazioneDesc')}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>{t('chiSiamo.section1.sicurezza')}</strong>{' '}
                    {t('chiSiamo.section1.sicurezzaDesc')}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>{t('chiSiamo.section1.salute')}</strong>{' '}
                    {t('chiSiamo.section1.saluteDesc')}
                  </p>
                </div>

                <div>
                  <p className="italic">{t('chiSiamo.section1.tagline')}</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1">
              <div className="h-80 overflow-hidden rounded-lg bg-gradient-to-br from-green-100 to-green-50">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mx-auto container px-4  text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            {t('chiSiamo.section1.missionTitle')}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-sm leading-relaxed text-gray-600 ">
            {t('chiSiamo.section1.missionDesc')}
          </p>

          <MissionCards />
        </div>

        {/* Pillars Section */}
        <div className="mx-auto container px-4 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            {t('chiSiamo.section1.pillarsTitle')}
          </h2>
          <PillarsCards />
        </div>
      </div>
    </Container>
  );
};

export default ChiSiamo;
