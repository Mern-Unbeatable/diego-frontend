import {
  Button,
  Heading,
  Container,
  Paragraph,
} from '../../../../components/ui';
import { useTranslation } from 'react-i18next';

const WeAreSection = () => {
  const { t } = useTranslation();
  const handleFormContattoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <Container className={''}>
      <div className="rounded-xl border border-[#D1D1D1] bg-[#FFFFFF] p-6 px-6 py-6 sm:px-8 md:px-[60px] lg:px-[80px]">
        <div className="text-center">
          <Heading level={1}>{t('contactUs.section1.heroTitle')}</Heading>
          <div className="mx-auto my-5 lg:max-w-[610px]">
            <Paragraph className={'my-3'}>
              {t('contactUs.section1.heroDescription')}
            </Paragraph>
          </div>
          <Heading level={2}>{t('contactUs.section1.formTitle')}</Heading>
        </div>
        <div className="">
          <form onSubmit={handleFormContattoSubmit}>
            <div className="gap-6 md:flex">
              <div className="w-full">
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'name'}
                  type={'text'}
                  placeholder={t('contactUs.section1.nomePlaceholder')}
                  title={t('contactUs.section1.nome')}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'azienda'}
                  type={'text'}
                  placeholder={t('contactUs.section1.aziendaPlaceholder')}
                  title={t('contactUs.section1.azienda')}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'telefono'}
                  type={'number'}
                  placeholder={t('contactUs.section1.telefonoPlaceholder')}
                  title={t('contactUs.section1.telefono')}
                />
              </div>
              <div className="w-full">
                <Input
                  title={t('contactUs.section1.cognome')}
                  type={'text'}
                  name={'cognome'}
                  placeholder={t('contactUs.section1.cognomePlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={t('contactUs.section1.piva')}
                  type={'text'}
                  name={'piva'}
                  placeholder={t('contactUs.section1.pivaPlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={t('contactUs.section1.email')}
                  type={'email'}
                  name={'email'}
                  placeholder={t('contactUs.section1.emailPlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <label className="mb-2 block text-sm font-medium text-[#828282]">
                {t('contactUs.section1.messaggioPlaceholder')}
              </label>
              <textarea
                name="message"
                type={'text'}
                placeholder={t('contactUs.section1.messaggioPlaceholder')}
                className="max-h-[120px] min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:ring-4 focus:ring-[#F1F9F6] focus:outline-none"
              />
            </div>
            <div className="mt-4 flex w-full gap-6 sm:mt-5 md:my-6">
              <Button
                variant="primary"
                className={'w-full rounded-lg'}
                text={t('contactUs.section1.submit')}
              />
              <Button className={'w-full'} text={t('trainingPages.section5.details')} />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default WeAreSection;
