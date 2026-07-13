import { useState } from 'react';
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

const inputClass =
  'rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm';

/** Keys kept from earlier registration steps (not company profile fields) */
const REGISTRATION_META_KEYS = [
  'email',
  'preferredLanguage',
  'accountType',
];

/**
 * COMPANY fields for POST /auth/register/complete
 * Matches API body exactly (password / confirmPassword / consent / preferredLanguage
 * are added on the password step).
 */
const CompanyInfoForm = () => {
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

    // Keep only registration meta + exact COMPANY body fields
    // (avoid leftover PRIVATE fields polluting the complete payload)
    const meta = {};
    REGISTRATION_META_KEYS.forEach((key) => {
      if (draft[key] !== undefined && draft[key] !== null && draft[key] !== '') {
        meta[key] = draft[key];
      }
    });

    STORAGE.clearUser();
    STORAGE.setUser({
      ...meta,
      accountType: meta.accountType || 'business',
      firstName: data.firstName,
      lastName: data.lastName,
      fiscalAddress: data.fiscalAddress,
      fiscalCode: data.fiscalCode,
      citizenship,
      contactNumber: data.contactNumber,
      serviceType: data.serviceType,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyVatNumber: data.companyVatNumber,
      companyTaxCode: data.companyTaxCode,
      companyPosition: data.companyPosition,
      pec: data.pec,
      uniqueCode: data.uniqueCode,
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

        <Heading level={4}>{t('auth.setup.companyInfo.title')}</Heading>

        <form onSubmit={handleFormSubmit}>
          {/* firstName / lastName */}
          <div className="mb-3 flex w-full gap-5">
            <div className="w-full">
              <Label
                htmlFor="firstName"
                required
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.firstNameLabel')}
              </Label>
              <InputField
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={draft.firstName || ''}
                placeholder="Maria"
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="lastName"
                required
                className="mb-2 block text-sm font-medium"
              >
                {t('auth.setup.info.lastNameLabel')}
              </Label>
              <InputField
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={draft.lastName || ''}
                placeholder="Rossi"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* fiscalAddress */}
          <div className="mb-6">
            <Label
              htmlFor="fiscalAddress"
              required
              className="mb-2 block text-sm font-medium"
            >
              Fiscal address
            </Label>
            <InputField
              type="text"
              id="fiscalAddress"
              name="fiscalAddress"
              defaultValue={draft.fiscalAddress || ''}
              placeholder="Via Liberta 5, 00100 Rome"
              className={inputClass}
              required
            />
          </div>

          {/* fiscalCode */}
          <div className="mb-6">
            <Label
              htmlFor="fiscalCode"
              required
              className="mb-2 block text-sm font-medium"
            >
              Fiscal code
            </Label>
            <InputField
              type="text"
              id="fiscalCode"
              name="fiscalCode"
              defaultValue={draft.fiscalCode || ''}
              placeholder="5765"
              className={inputClass}
              required
            />
          </div>

          {/* citizenship */}
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

          {/* contactNumber / serviceType */}
          <div className="mb-6 flex w-full gap-5">
            <div className="w-full">
              <Label
                htmlFor="contactNumber"
                required
                className="mb-2 block text-sm font-medium"
              >
                Contact number
              </Label>
              <InputField
                type="text"
                id="contactNumber"
                name="contactNumber"
                defaultValue={draft.contactNumber || ''}
                placeholder="+39 02 1234 5678"
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="serviceType"
                required
                className="mb-2 block text-sm font-medium"
              >
                Service type
              </Label>
              <InputField
                type="text"
                id="serviceType"
                name="serviceType"
                defaultValue={draft.serviceType || ''}
                placeholder="Corporate Training"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* companyName */}
          <div className="mb-6">
            <Label
              htmlFor="companyName"
              required
              className="mb-2 block text-sm font-medium"
            >
              Company name
            </Label>
            <InputField
              type="text"
              id="companyName"
              name="companyName"
              defaultValue={draft.companyName || ''}
              placeholder="Tech Solutions S.r.l."
              className={inputClass}
              required
            />
          </div>

          {/* companyAddress */}
          <div className="mb-6">
            <Label
              htmlFor="companyAddress"
              required
              className="mb-2 block text-sm font-medium"
            >
              Company address
            </Label>
            <InputField
              type="text"
              id="companyAddress"
              name="companyAddress"
              defaultValue={draft.companyAddress || ''}
              placeholder="Via Milano 45, 20100 Milano"
              className={inputClass}
              required
            />
          </div>

          {/* companyVatNumber / companyTaxCode */}
          <div className="mb-6 flex w-full gap-5">
            <div className="w-full">
              <Label
                htmlFor="companyVatNumber"
                required
                className="mb-2 block text-sm font-medium"
              >
                Company VAT number
              </Label>
              <InputField
                type="text"
                id="companyVatNumber"
                name="companyVatNumber"
                defaultValue={draft.companyVatNumber || ''}
                placeholder="IT12345678901"
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="companyTaxCode"
                required
                className="mb-2 block text-sm font-medium"
              >
                Company tax code
              </Label>
              <InputField
                type="text"
                id="companyTaxCode"
                name="companyTaxCode"
                defaultValue={draft.companyTaxCode || ''}
                placeholder="12345678901"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* companyPosition */}
          <div className="mb-6">
            <Label
              htmlFor="companyPosition"
              required
              className="mb-2 block text-sm font-medium"
            >
              Company position
            </Label>
            <InputField
              type="text"
              id="companyPosition"
              name="companyPosition"
              defaultValue={draft.companyPosition || ''}
              placeholder="HR Manager"
              className={inputClass}
              required
            />
          </div>

          {/* pec / uniqueCode */}
          <div className="mb-6 flex w-full gap-5">
            <div className="w-full">
              <Label
                htmlFor="pec"
                required
                className="mb-2 block text-sm font-medium"
              >
                PEC
              </Label>
              <InputField
                type="text"
                id="pec"
                name="pec"
                defaultValue={draft.pec || ''}
                placeholder="hr@pec.techsolutions.it"
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="uniqueCode"
                required
                className="mb-2 block text-sm font-medium"
              >
                Unique code
              </Label>
              <InputField
                type="text"
                id="uniqueCode"
                name="uniqueCode"
                defaultValue={draft.uniqueCode || ''}
                placeholder="ABCDEF01"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="mx-auto flex w-full justify-end py-2">
            <button
              type="submit"
              className="w-[100px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] py-2 font-medium text-white transition-colors hover:bg-white hover:text-[#73BFA1]"
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
