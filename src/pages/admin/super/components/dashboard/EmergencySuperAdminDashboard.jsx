import React, { useState } from 'react';
import { Download, UserPlus, CreditCard } from 'lucide-react';

export default function EmergencyControlPanel() {
  const [permissions, setPermissions] = useState({
    download: true,
    userPanel: true,
    payments: true,
    maintenance: false,
  });

  const toggle = (key) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  const Switch = ({ active, onClick, color = 'emerald' }) => (
    <button
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
        active
          ? color === 'emerald'
            ? 'bg-emerald-500'
            : 'bg-red-600'
          : 'bg-gray-300'
      }`}
    >
      <span
        className={`h-6 w-6 transform rounded-full bg-white shadow transition ${
          active ? 'translate-x-8' : 'translate-x-2'
        }`}
      />
    </button>
  );

  const PermissionCard = ({
    icon,
    title,
    desc,
    active,
    onToggle,
    color = 'emerald',
  }) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center text-emerald-600">
            {icon}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <Switch active={active} onClick={onToggle} color={color} />
      </div>

      <p className="mt-6 text-base text-gray-800">{desc}</p>

      <div className="mt-6">
        <span
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm ${
            active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {active ? 'Attivo' : 'Inattivo'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl bg-gray-50 p-8">
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Pannello di controllo in emergenza
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PermissionCard
          icon={<Download className="h-5 w-5" />}
          title="Permesso download"
          desc="Consenti agli utenti di scaricare gli attestati"
          active={permissions.download}
          onToggle={() => toggle('download')}
        />
        <PermissionCard
          icon={<UserPlus className="h-5 w-5" />}
          title="Nuovo pannello di controllo utente"
          desc="Abilita la creazione di nuovi account utente"
          active={permissions.userPanel}
          onToggle={() => toggle('userPanel')}
        />
        <PermissionCard
          icon={<CreditCard className="h-5 w-5" />}
          title="Elaborazione dei pagamenti"
          desc="Elaborare i pagamenti degli abbonamenti e dei corsi"
          active={permissions.payments}
          onToggle={() => toggle('payments')}
        />
        <PermissionCard
          icon={<UserPlus className="h-5 w-5" />}
          title="Piattaforma in manutenzione"
          desc="Piattaforma in manutenzione"
          active={permissions.maintenance}
          onToggle={() => toggle('maintenance')}
          color="red"
        />
      </div>
    </div>
  );
}
