import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import {
  Divider,
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { BackpackIcon } from 'lucide-react';
import { BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const CompanyInformation = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelected(selected === value ? '' : value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    // 🔥 NEXT STEP CONTROL
    navigate('/auth/register/setup-password');
  };

  return (
    <div className="flex h-auto flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <Paragraph className="flex items-center gap-x-2 text-sm text-gray-600">
            {' '}
            <BiArrowBack /> {t('auth.setup.steps.step2of3')}
          </Paragraph>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <GrClose className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <Heading level={4}>{t('auth.setup.companyInfo.title')}</Heading>

        <form onSubmit={handleFormSubmit}>
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
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="office"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.officeLabel')}
            </Label>
            <InputField
              type="text"
              name="office"
              placeholder={t('auth.setup.companyInfo.officePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="vatNumber"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.vatLabel')}
            </Label>
            <InputField
              type="number"
              name="vatNumber"
              placeholder={t('auth.setup.companyInfo.vatPlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="taxCode"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.taxCodeLabel')}
            </Label>
            <InputField
              type="number"
              name="taxCode"
              placeholder="987456321"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="email"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.companyInfo.emailLabel')}
            </Label>
            <InputField
              name="email"
              placeholder="example@gmail.com"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
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

export default CompanyInformation;
