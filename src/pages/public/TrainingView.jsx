import Container from '../../components/common/Container';
import { useTranslation } from 'react-i18next';

const TrainingView = () => {
  const { t } = useTranslation();
  return <Container>{t('trainingPages.section1.trainingViewTitle')}</Container>;
};

export default TrainingView;
