import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import {
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../components/ui';
import { STORAGE } from '../../../../utils/storage/authStorage';

const CompanyInfoForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    STORAGE.setUser({ ...data });

    navigate('/auth/register/setup-password');
  };

  return (
    <div className="flex h-auto flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <Paragraph className="flex items-center gap-x-2 text-sm text-gray-600">
            <Link
              to={`/auth/register/setup-role`}
              className="flex items-center gap-x-2"
            >
              <BiArrowBack className="text-lg" /> Back
            </Link>
          </Paragraph>
          <Paragraph className="text-sm text-gray-600">Steps 2/3</Paragraph>
        </div>

        <Heading level={4}>{t('auth.setup.companyInfo.title')}</Heading>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 flex w-full gap-5">
            <div className="w-full">
              <Label
                htmlFor="firstName"
                required={true}
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.firstNameLabel')}
              </Label>
              <InputField
                type="text"
                name="firstName"
                placeholder={t('auth.setup.info.firstNamePlaceholder')}
                className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="lastName"
                required={true}
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.lastNameLabel')}
              </Label>
              <InputField
                type="text"
                name="lastName"
                placeholder={t('auth.setup.info.lastNamePlaceholder')}
                className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="companyName"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.companyNameLabel')}
            </Label>
            <InputField
              type="text"
              name="companyName"
              placeholder={t('auth.setup.companyInfo.companyNamePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="fiscalAddress"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.officeLabel')}
            </Label>
            <InputField
              type="text"
              name="fiscalAddress"
              placeholder={t('auth.setup.companyInfo.officePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="companyVatNumber"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.vatLabel')}
            </Label>
            <InputField
              type="text"
              name="companyVatNumber"
              placeholder={t('auth.setup.companyInfo.vatPlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="fiscalCode"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.taxCodeLabel')}
            </Label>
            <InputField
              type="text"
              name="fiscalCode"
              placeholder="987456321"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div className="mx-auto flex w-full justify-end py-2">
            <button
              type="submit"
              className="w-[100px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] py-2 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
            >
              {t('auth.common.proceed')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
