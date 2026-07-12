import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import {
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../components/ui';
import { STORAGE } from '../../../../utils/storage/authStorage';

const inputClass =
  'rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm';

/**
 * PRIVATE account fields for POST /auth/register/complete
 * (password, confirmPassword, consent, preferredLanguage set at password step)
 */
const StandardInfoForm = () => {
  const { t } = useTranslation();
  const draft = STORAGE.getUser() || {};
  const [citizenship, setCitizenship] = useState(
    () => draft.citizenship || 'ITALIAN',
  );
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    STORAGE.setUser({
      ...data,
      citizenship,
    });

    navigate('/auth/register/setup-password');
  };

  return (
    <div className="flex h-auto flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <Paragraph className="flex items-center gap-x-2 text-sm text-gray-600">
            <Link
              to="/auth/register/setup-role"
              className="flex items-center gap-x-2"
            >
              <BiArrowBack className="text-lg" /> Back
            </Link>
          </Paragraph>
          <Paragraph className="text-sm text-gray-600">Steps 2/3</Paragraph>
        </div>

        <Heading level={4}>{t('auth.setup.info.title')}</Heading>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 flex w-full gap-5">
            <div className="w-full">
              <Label htmlFor="firstName" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.info.firstNameLabel')}
              </Label>
              <InputField
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={draft.firstName || ''}
                placeholder={t('auth.setup.info.firstNamePlaceholder')}
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="lastName" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.info.lastNameLabel')}
              </Label>
              <InputField
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={draft.lastName || ''}
                placeholder={t('auth.setup.info.lastNamePlaceholder')}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="birthDate" required className="mb-2 block text-sm font-medium">
              {t('auth.setup.info.birthDateLabel')}
            </Label>
            <InputField
              type="date"
              id="birthDate"
              name="birthDate"
              defaultValue={draft.birthDate || ''}
              className={inputClass}
              required
            />
          </div>

          <div className="mb-6 flex w-full gap-5">
            <div className="w-full">
              <Label htmlFor="city" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.info.cityLabel')}
              </Label>
              <InputField
                type="text"
                id="city"
                name="city"
                defaultValue={draft.city || ''}
                placeholder={t('auth.setup.info.cityPlaceholder')}
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="country" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.info.countryLabel')}
              </Label>
              <InputField
                type="text"
                id="country"
                name="country"
                defaultValue={draft.country || ''}
                placeholder={t('auth.setup.info.countryPlaceholder')}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="residenceAddress"
              required
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.addressLabel')}
            </Label>
            <InputField
              type="text"
              id="residenceAddress"
              name="residenceAddress"
              defaultValue={draft.residenceAddress || ''}
              placeholder={t('auth.setup.info.addressPlaceholder')}
              className={inputClass}
              required
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="traineeTaxCode"
              required
              className="mb-2 block text-sm font-medium"
            >
              {t('auth.setup.info.taxCodeLabel')}
            </Label>
            <InputField
              type="text"
              id="traineeTaxCode"
              name="traineeTaxCode"
              defaultValue={draft.traineeTaxCode || ''}
              placeholder={t('auth.setup.info.taxCodePlaceholder')}
              className={inputClass}
              required
            />
          </div>

          <Heading level={4}>{t('auth.setup.info.citizenshipTitle')}</Heading>

          <div className="my-5 flex items-center gap-8">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="citizenship"
                value="ITALIAN"
                checked={citizenship === 'ITALIAN'}
                onChange={() => setCitizenship('ITALIAN')}
                className="h-4 w-4 cursor-pointer accent-gray-700"
              />
              <span className="text-sm text-gray-700">
                {t('auth.setup.info.citizenshipItalian')}
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="citizenship"
                value="FOREIGN"
                checked={citizenship === 'FOREIGN'}
                onChange={() => setCitizenship('FOREIGN')}
                className="h-4 w-4 cursor-pointer accent-gray-700"
              />
              <span className="text-sm text-gray-700">
                {t('auth.setup.info.citizenshipForeign')}
              </span>
            </label>
          </div>

          <hr className="border-t border-gray-300" />
          <div className="mx-auto flex w-full justify-end py-5">
            <button
              type="submit"
              className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-[#73BFA1]"
            >
              {t('auth.common.proceed')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StandardInfoForm;
