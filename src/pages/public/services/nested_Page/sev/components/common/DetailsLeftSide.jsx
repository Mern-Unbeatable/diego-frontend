import { Heading, Paragraph } from '../../../../../../../components/ui';
import ServiceList from './../../../../../../../components/common/ServiceList';
import { useTranslation } from 'react-i18next';

const DetailsLeftSide = () => {
  const { t } = useTranslation();
  const serviceItems = t('servicesPages.common.includeItems', {
    returnObjects: true,
  });

  return (
    <div>
      <Heading level={2}>{t('servicesPages.common.serviceDetailsTitle')}</Heading>
      <Paragraph className={'mt-4 max-w-[586px]'}>
        {t('servicesPages.sevCourses.description')}
      </Paragraph>
      <Heading level={4} className={'my-6'}>
        {t('servicesPages.common.serviceIncludesTitle')}
      </Heading>
      {/* Service List Components */}
      <ServiceList items={serviceItems} />
    </div>
  );
};

export default DetailsLeftSide;
