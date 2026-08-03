// import React from 'react';
// import { Download, UserPlus, CreditCard } from 'lucide-react';
// import Loading from '../../../../../components/ui/Utilities/Loading';

// export default function EmergencyControlPanel({
//   permissions,
//   loading = false,
//   saving = false,
//   onToggle,
// }) {
//   const values = permissions || {
//     download: true,
//     userPanel: true,
//     payments: true,
//     maintenance: false,
//   };

//   const toggle = (key) => {
//     if (saving || loading || !onToggle) return;
//     onToggle(key);
//   };

//   const Switch = ({ active, onClick, color = 'emerald' }) => (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={active}
//       onClick={onClick}
//       disabled={saving || loading}
//       className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
//         active
//           ? color === 'emerald'
//             ? 'bg-emerald-500'
//             : 'bg-red-600'
//           : 'bg-gray-300'
//       } ${saving || loading ? 'cursor-not-allowed opacity-60' : ''}`}
//     >
//       <span
//         className={`h-6 w-6 transform rounded-full bg-white shadow transition ${
//           active ? 'translate-x-8' : 'translate-x-2'
//         }`}
//       />
//     </button>
//   );

//   const PermissionCard = ({
//     icon,
//     title,
//     desc,
//     active,
//     onToggleClick,
//     color = 'emerald',
//   }) => (
//     <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <span className="grid h-8 w-8 place-items-center text-emerald-600">
//             {icon}
//           </span>
//           <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//         </div>
//         <Switch active={active} onClick={onToggleClick} color={color} />
//       </div>

//       <p className="mt-6 text-base text-gray-800">{desc}</p>

//       <div className="mt-6">
//         <span
//           className={`inline-flex items-center rounded-full px-4 py-2 text-sm ${
//             active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
//           }`}
//         >
//           {active ? 'Attivo' : 'Inattivo'}
//         </span>
//       </div>
//     </div>
//   );

//   if (loading && !permissions) {
//     return <Loading size="md" className="min-h-40" />;
//   }

//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-4 md:p-8">
//       <h1 className="mb-8 text-2xl font-semibold text-gray-900">
//         Pannello di controllo in emergenza  
//       </h1>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <PermissionCard
//           icon={<Download className="h-4 md:h-6 w-4 md:w-6" />}
//           title="Permesso download"
//           desc="Consenti agli utenti di scaricare gli attestati"
//           active={values.download}
//           onToggleClick={() => toggle('download')}
//         />
//         <PermissionCard
//           icon={<UserPlus className="h-5 w-5" />}
//           title="Nuovo pannello di controllo utente"
//           desc="Abilita la creazione di nuovi account utente"
//           active={values.userPanel}
//           onToggleClick={() => toggle('userPanel')}
//         />
//         <PermissionCard
//           icon={<CreditCard className="h-5 w-5" />}
//           title="Elaborazione dei pagamenti"
//           desc="Elaborare i pagamenti degli abbonamenti e dei corsi"
//           active={values.payments}
//           onToggleClick={() => toggle('payments')}
//         />
//         <PermissionCard
//           icon={<UserPlus className="h-5 w-5" />}
//           title="Piattaforma in manutenzione"
//           desc="Piattaforma in manutenzione"
//           active={values.maintenance}
//           onToggleClick={() => toggle('maintenance')}
//           color="red"
//         />
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { Download, UserPlus, CreditCard, Wrench } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';

export default function EmergencyControlPanel({
  permissions,
  loading = false,
  saving = false,
  onToggle,
}) {
  const values = permissions || {
    download: true,
    userPanel: true,
    payments: true,
    maintenance: false,
  };

  const toggle = (key) => {
    if (saving || loading || !onToggle) return;
    onToggle(key);
  };

  const Switch = ({ active, onClick, color = 'emerald' }) => (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onClick}
      disabled={saving || loading}
      className={`relative inline-flex h-6 w-12 sm:h-8 sm:w-16 shrink-0 items-center rounded-full transition-colors ${
        active
          ? color === 'emerald'
            ? 'bg-emerald-500'
            : 'bg-red-600'
          : 'bg-gray-300'
      } ${saving || loading ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span
        className={`h-4 w-4 sm:h-6 sm:w-6 transform rounded-full bg-white shadow transition-transform ${
          active ? 'translate-x-6 sm:translate-x-8' : 'translate-x-1 sm:translate-x-2'
        }`}
      />
    </button>
  );

  const PermissionCard = ({
    icon,
    title,
    desc,
    active,
    onToggleClick,
    color = 'emerald',
  }) => (
    <div className="rounded-xl sm:rounded-2xl bg-white p-4 md:p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header section with Icon, Title, and Switch */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center text-emerald-600">
              {icon}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
              {title}
            </h3>
          </div>
          <Switch active={active} onClick={onToggleClick} color={color} />
        </div>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-4 sm:mt-6">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium ${
            active
              ? color === 'red'
                ? 'bg-red-50 text-red-700'
                : 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {active ? 'Attivo' : 'Inattivo'}
        </span>
      </div>
    </div>
  );

  if (loading && !permissions) {
    return <Loading size="md" className="min-h-40" />;
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8">
      <h1 className="mb-4 sm:mb-8 text-xl sm:text-2xl font-semibold text-gray-900">
        Pannello di controllo in emergenza  
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <PermissionCard
          icon={<Download className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Permesso download"
          desc="Consenti agli utenti di scaricare gli attestati"
          active={values.download}
          onToggleClick={() => toggle('download')}
        />
        <PermissionCard
          icon={<UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Nuovo pannello di controllo utente"
          desc="Abilita la creazione di nuovi account utente"
          active={values.userPanel}
          onToggleClick={() => toggle('userPanel')}
        />
        <PermissionCard
          icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Elaborazione dei pagamenti"
          desc="Elaborare i pagamenti degli abbonamenti e dei corsi"
          active={values.payments}
          onToggleClick={() => toggle('payments')}
        />
        <PermissionCard
          icon={<Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />}
          title="Piattaforma in manutenzione"
          desc="Piattaforma in manutenzione"
          active={values.maintenance}
          onToggleClick={() => toggle('maintenance')}
          color="red"
        />
      </div>
    </div>
  );
}