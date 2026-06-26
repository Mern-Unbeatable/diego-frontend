import { useTranslation } from 'react-i18next';

const LeftSide = () => {
  const { t } = useTranslation();
  return <div>{t('servicesPages.section1.serviceDetailsTitle')}</div>
}

export default LeftSide
