import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { STORAGE } from '../../../utils/storage/authStorage';

const roles = [
  { id: 'PRIVATE', image: '/image/register/icon.png' },
  { id: 'COMPANY', image: '/image/register/icon2.png' },
  { id: 'LICENSEE', image: '/image/register/icon3.png' },
];

const RoleCard = ({ label, image, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-44 w-full rounded-2xl border-2 p-4 transition-all ${
        isSelected
          ? 'border-emerald-400 bg-white shadow-md'
          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
      }`}
    >
      <div className="absolute top-3 right-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            isSelected ? 'bg-emerald-400' : 'bg-gray-200'
          }`}
        >
          {isSelected && <FaCheckCircle className="h-4 w-4 text-white" />}
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-3">
        <img src={image} alt={label} className="w-ful h-20 object-cover" />
        <span className="text-center text-sm font-semibold text-gray-900">
          {label}
        </span>
      </div>
    </button>
  );
};

const RoleSetupView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // Get accountType from URL if it exists
  const initialRole = searchParams.get('accountType') || '';

  const [selectedRole, setSelectedRole] = useState(initialRole);

  const roleLabels = {
    PRIVATE: t('auth.setup.role.options.standard'),
    COMPANY: t('auth.setup.role.options.business'),
    LICENSEE: t('auth.setup.role.options.licensed'),
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);

    // Update URL
    setSearchParams({ accountType: role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    STORAGE.setUser({
      accountType: selectedRole,
    });

    // Navigate with query param
    navigate(`/auth/register/setup-info?accountType=${selectedRole}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-8">
        <h1 className="text-3xl font-bold text-gray-900">Ruolo</h1>
        <p className="mt-2 text-gray-600">Tu sei un:</p>
      </div>

      <div className="mt-8 grid max-w-2xl grid-cols-1 gap-6 px-8 sm:grid-cols-2">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            label={roleLabels[role.id]}
            image={role.image}
            isSelected={selectedRole === role.id}
            onClick={() => handleRoleChange(role.id)}
          />
        ))}
      </div>

      <div className="mt-10">
        <div className="border-t border-gray-200" />
      </div>

      <div className="mt-8 flex justify-end px-8">
        <button
          type="submit"
          className="rounded-full border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 text-white hover:bg-white hover:text-[#73BFA1]"
        >
          Procedi
        </button>
      </div>
    </form>
  );
};

export default RoleSetupView;
