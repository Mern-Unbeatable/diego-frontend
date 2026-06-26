import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import {
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { BackpackIcon } from 'lucide-react';
import { BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const SetupInfo = () => {
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

        <Heading level={4}>{t('auth.setup.info.title')}</Heading>

        <form onSubmit={handleFormSubmit}>
          {/* Name */}
          <div className="mb-3 flex w-full gap-5 transition-all duration-300">
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
                className="rounded-2xl border border-green-100 bg-white px-4 py-3"
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
              />
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="lastName"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.birthDateLabel')}
            </Label>
            <InputField
              type="date"
              name="birthDate"
              placeholder={t('auth.setup.info.birthDatePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6 flex w-full gap-5 transition-all duration-300">
            <div className="w-full">
              <Label
                htmlFor="city"
                required={true}
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.cityLabel')}
              </Label>
              <InputField
                type="text"
                name="city"
                placeholder={t('auth.setup.info.cityPlaceholder')}
                className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="country"
                required={true}
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.countryLabel')}
              </Label>
              <InputField
                type="text"
                name="country"
                placeholder={t('auth.setup.info.countryPlaceholder')}
                className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="address"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.addressLabel')}
            </Label>
            <InputField
              type="text"
              name="address"
              placeholder={t('auth.setup.info.addressPlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="companyName"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.companyNameLabel')}
            </Label>
            <InputField
              type="text"
              name="companyName"
              placeholder={t('auth.setup.info.companyNamePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="office"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.officeLabel')}
            </Label>
            <InputField
              type="text"
              name="office"
              placeholder={t('auth.setup.info.officePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="vatNumber"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.vatNumberLabel')}
            </Label>
            <InputField
              type="number"
              name="vatNumber"
              placeholder={t('auth.setup.info.vatNumberPlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="taxCode"
              required={true}
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.taxCodeLabel')}
            </Label>
            <InputField
              type="number"
              name="taxCode"
              placeholder={t('auth.setup.info.taxCodePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm"
            />
          </div>

          <Heading level={4}>{t('auth.setup.info.citizenshipTitle')}</Heading>

          <div className="my-5 flex items-center">
            <div className="flex items-center gap-8">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected === 'estera'}
                  onChange={() => handleChange('estera')}
                  name="citizenship"
                  value="estera"
                  className="h-4 w-4 cursor-pointer rounded border border-gray-400 accent-gray-700"
                />
                <span className="text-sm text-gray-700">{t('auth.setup.info.citizenshipForeign')}</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected === 'italiana'}
                  onChange={() => handleChange('italiana')}
                  name="citizenship"
                  value="italiana"
                  className="h-4 w-4 cursor-pointer rounded border border-gray-400 accent-gray-700"
                />
                <span className="text-sm text-gray-700">{t('auth.setup.info.citizenshipItalian')}</span>
              </label>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="mx-auto flex w-full justify-end py-5">
            <button
              type="submit"
              className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
            >
              {t('auth.common.proceed')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupInfo;
