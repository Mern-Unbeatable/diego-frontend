import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';

import {
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../components/ui';

import SubdomainModal from '../../../../components/auth/SubdomainModal';
import { STORAGE } from '../../../../utils/storage/authStorage';

const inputClass =
  'rounded-2xl border border-green-100 bg-white px-4 py-3';

/**
 * LICENSEE account fields for POST /auth/register/complete
 * (password, confirmPassword, consent, preferredLanguage set at password step)
 */
const LicenseInfoForm = () => {
  const { t } = useTranslation();
  const draft = STORAGE.getUser() || {};
  const [openModal, setOpenModal] = useState(false);
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
              to="/auth/register/setup-role"
              className="flex items-center gap-x-2"
            >
              <BiArrowBack className="text-lg" /> Back
            </Link>
          </Paragraph>
          <Paragraph className="text-sm text-gray-600">Steps 2/3</Paragraph>
        </div>

        <Heading level={4}>{t('auth.setup.companyInfo.title')}</Heading>

        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="mb-3 flex w-full gap-5">
            <div className="w-full">
              <Label htmlFor="firstName" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.info.firstNameLabel')}
              </Label>
              <InputField
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
            <Label htmlFor="companyName" required className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.companyNameLabel')}
            </Label>
            <InputField
              id="companyName"
              name="companyName"
              defaultValue={draft.companyName || ''}
              placeholder={t('auth.setup.companyInfo.companyNamePlaceholder')}
              className={inputClass}
              required
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="fiscalAddress" required className="mb-2 block text-sm font-medium">
              Fiscal address
            </Label>
            <InputField
              id="fiscalAddress"
              name="fiscalAddress"
              defaultValue={draft.fiscalAddress || ''}
              placeholder={t('auth.setup.companyInfo.officePlaceholder')}
              className={inputClass}
              required
            />
          </div>

          <div className="mb-6 flex w-full gap-5">
            <div className="w-full">
              <Label htmlFor="vatNumber" required className="mb-2 block text-sm font-medium">
                {t('auth.setup.companyInfo.vatLabel')}
              </Label>
              <InputField
                id="vatNumber"
                name="vatNumber"
                defaultValue={draft.vatNumber || ''}
                placeholder="IT98765432109"
                className={inputClass}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="fiscalCode" required className="mb-2 block text-sm font-medium">
                Fiscal code
              </Label>
              <InputField
                id="fiscalCode"
                name="fiscalCode"
                defaultValue={draft.fiscalCode || ''}
                placeholder="BRNRBT85sM10A562S"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="pec" className="mb-2 block text-sm font-medium">
              PEC
            </Label>
            <InputField
              type="email"
              id="pec"
              name="pec"
              defaultValue={draft.pec || ''}
              placeholder="brown.consulting@pec.it"
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Label htmlFor="uniqueCode" className="text-sm font-medium">
                Unique code
              </Label>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Help about unique code"
              >
                <FiHelpCircle size={18} />
              </button>
            </div>
            <InputField
              id="uniqueCode"
              name="uniqueCode"
              defaultValue={draft.uniqueCode || ''}
              placeholder="ABC789"
              className={inputClass}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-[120px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] py-2 text-white hover:bg-white hover:text-[#73BFA1]"
            >
              {t('auth.common.proceed')}
            </button>
          </div>
        </form>
      </div>

      <SubdomainModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default LicenseInfoForm;
