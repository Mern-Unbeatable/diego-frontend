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
          <Heading level={1}>{t('contactUs.heroTitle')}</Heading>
          <div className="mx-auto my-5 lg:max-w-[610px]">
            <Paragraph className={'my-3'}>
              {t('contactUs.heroDescription')}
            </Paragraph>
          </div>
          <Heading level={2}>{t('contactUs.formTitle')}</Heading>
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
                  placeholder={t('contactUs.nomePlaceholder')}
                  title={t('contactUs.nome')}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'azienda'}
                  type={'text'}
                  placeholder={t('contactUs.aziendaPlaceholder')}
                  title={t('contactUs.azienda')}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'telefono'}
                  type={'number'}
                  placeholder={t('contactUs.telefonoPlaceholder')}
                  title={t('contactUs.telefono')}
                />
              </div>
              <div className="w-full">
                <Input
                  title={t('contactUs.cognome')}
                  type={'text'}
                  name={'cognome'}
                  placeholder={t('contactUs.cognomePlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={t('contactUs.piva')}
                  type={'text'}
                  name={'piva'}
                  placeholder={t('contactUs.pivaPlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={t('contactUs.email')}
                  type={'email'}
                  name={'email'}
                  placeholder={t('contactUs.emailPlaceholder')}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <label className="mb-2 block text-sm font-medium text-[#828282]">
                {t('contactUs.messaggioPlaceholder')}
              </label>
              <textarea
                name="message"
                type={'text'}
                placeholder={t('contactUs.messaggioPlaceholder')}
                className="max-h-[120px] min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:ring-4 focus:ring-[#F1F9F6] focus:outline-none"
              />
            </div>
            <div className="mt-4 flex w-full gap-6 sm:mt-5 md:my-6">
              <Button
                variant="primary"
                className={'w-full rounded-lg'}
                text={t('contactUs.submit')}
              />
              <Button className={'w-full'} text={t('trainingPages.catalog.details')} />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default WeAreSection;
