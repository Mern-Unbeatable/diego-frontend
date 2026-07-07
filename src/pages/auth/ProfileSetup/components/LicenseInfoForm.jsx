import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

import {
  Heading,
  InputField,
  Label,
  Paragraph,
} from '../../../../components/ui';

import SubdomainModal from '../../../../components/auth/SubdomainModal';

const LicenseInfoForm = () => {
  const [selected, setSelected] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    navigate('/auth/register/setup-password');
  };

  return (
    <div className="flex h-auto flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-4 px-6 py-4">
        {/* HEADER */}
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

        <form onSubmit={handleFormSubmit} className="mt-6">
          {/* COMPANY */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.companyNameLabel')}
            </Label>
            <InputField
              name="companyName"
              placeholder={t('auth.setup.companyInfo.companyNamePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* OFFICE */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.officeLabel')}
            </Label>
            <InputField
              name="office"
              placeholder={t('auth.setup.companyInfo.officePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* VAT */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.vatLabel')}
            </Label>
            <InputField
              name="vatNumber"
              placeholder="DE11111"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* TAX */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.taxCodeLabel')}
            </Label>
            <InputField
              name="taxCode"
              placeholder="987456321"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.companyInfo.emailLabel')}
            </Label>
            <InputField
              name="contactEmail"
              placeholder="example@gmail.com"
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* SOTTODOMINIO WITH HELP ICON */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Label className="text-sm font-medium">
                {t('auth.setup.freelancer.subdomainLabel')}
              </Label>

              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiHelpCircle size={18} />
              </button>
            </div>

            <InputField
              name="subdomain"
              placeholder={t('auth.setup.freelancer.subdomainPlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* SERVICE TYPE */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">
              {t('auth.setup.freelancer.serviceTypeLabel')}
            </Label>
            <InputField
              name="serviceType"
              placeholder={t('auth.setup.freelancer.serviceTypePlaceholder')}
              className="rounded-2xl border border-green-100 bg-white px-4 py-3"
            />
          </div>

          {/* SUBMIT */}
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

      {/* MODAL */}
      <SubdomainModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default LicenseInfoForm;
