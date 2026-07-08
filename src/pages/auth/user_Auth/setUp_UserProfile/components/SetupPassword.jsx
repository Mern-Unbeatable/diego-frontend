import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';

import {
  Heading,
  Paragraph,
  InputField,
  Label,
} from '../../../../../components/ui';

const SetupPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePassWordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log('Password data:', data);
    navigate('/dashboard/super-admin');
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header with Steps and Close */}
      <div className="mb-6 flex items-center justify-between">
        <Paragraph className="text-sm text-gray-600">{t('auth.setup.steps.step3of3')}</Paragraph>
      </div>

      <Heading level={3} className="mb-6">
        {t('auth.setup.password.title')}
      </Heading>

      <form onSubmit={handlePassWordSubmit} action="" className="space-y-2">
        <div className="mb-6">
          <Label
            htmlFor="password"
            required={true}
            className="mb-2 block text-xl font-medium"
          >
            {t('auth.setup.password.newPasswordLabel')}
          </Label>
          <InputField
            type="password"
            name="password"
            placeholder={t('auth.setup.password.newPasswordPlaceholder')}
            className="rounded-2xl border border-green-100 bg-white px-4 py-3"
          />
        </div>

        <Heading level={4}>
          {t('auth.setup.password.minLengthRule')}
        </Heading>
        <div className="my-6 flex flex-col gap-3">
          <Heading level={4}>{t('auth.setup.password.mustIncludeTitle')}</Heading>
          <Paragraph>{t('auth.setup.password.ruleUppercase')}</Paragraph>
          <Paragraph>{t('auth.setup.password.ruleLowercase')}</Paragraph>
          <Paragraph>{t('auth.setup.password.ruleNumber')}</Paragraph>
          <Paragraph>{t('auth.setup.password.ruleSpecial')}</Paragraph>
        </div>
        <Heading level={4}>
          {t('auth.setup.password.noPersonalInfoRule')}
        </Heading>
        <div className="mb-6">
          <Label
            htmlFor="password"
            required={true}
            className="mb-2 block text-xl font-medium"
          >
            {t('auth.setup.password.confirmPasswordLabel')}
          </Label>
          <InputField
            type="password"
            name="password"
            placeholder={t('auth.setup.password.confirmPasswordPlaceholder')}
            className="rounded-2xl border border-green-100 bg-white px-4 py-3"
          />
        </div>
        {/* Footer with Procedi button */}
        <div className="mx-auto flex w-full max-w-3xl justify-end px-6 py-8">
          <button
            type="submit"
            className="w-[140px] rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-medium text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
          >
            {t('auth.common.proceed')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupPassword;
