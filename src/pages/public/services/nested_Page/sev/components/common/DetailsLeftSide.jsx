import { Heading, Paragraph } from '../../../../../../../components/ui';
import ServiceList from './../../../../../../../components/common/ServiceList';
import { useTranslation } from 'react-i18next';

const DetailsLeftSide = () => {
  const { t } = useTranslation();
  const serviceItems = t('servicesPages.section1.includeItems', {
    returnObjects: true,
  });

  return (
    <div>
      <Heading level={2}>{t('servicesPages.section1.serviceDetailsTitle')}</Heading>
      <Paragraph className={'mt-4 max-w-[586px]'}>
        {t('servicesPages.section3.description')}
      </Paragraph>
      <Heading level={4} className={'my-6'}>
        {t('servicesPages.section1.serviceIncludesTitle')}
      </Heading>
      {/* Service List Components */}
      <ServiceList items={serviceItems} />
    </div>
  );
};

export default DetailsLeftSide;
