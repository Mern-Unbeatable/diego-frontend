// import React from 'react';
// import { Search, Download, Pencil, Trash2, Edit } from 'lucide-react';
// import { Toast, useToast } from '../../../../../components/ui';

// const StatusPill = ({ status }) => {
//   const map = {
//     Attivo: { cls: 'bg-emerald-50 text-emerald-700', label: 'Attivo' },
//     'In attesa di': { cls: 'bg-rose-50 text-rose-600', label: 'In attesa di' },
//     Inattivo: { cls: 'bg-red-600/10 text-red-600', label: 'Inattivo' },
//   };
//   const s = map[status] ?? map.Attivo;
//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${s.cls}`}
//     >
//       {s.label}
//     </span>
//   );
// };

// const ProgressBar = ({ value, max }) => {
//   const pct = Math.min(100, Math.round((value / max) * 100));
//   return (
//     <div className="flex min-w-[180px] items-center gap-3">
//       <div className="h-2 w-40 rounded-full bg-emerald-100">
//         <div
//           className="h-2 rounded-full bg-emerald-400"
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//       <span className="text-sm text-gray-700">
//         {value}/{max}
//       </span>
//     </div>
//   );
// };

// export default function LicenseeManagement({
//   rows = [],
//   search = '',
//   onSearchChange,
//   onExport,
//   onEditGlobal,
//   onEditRow,
//   onDeleteRow,
// }) {
//   const { toasts, addToast, removeToast } = useToast();
//   const euro = new Intl.NumberFormat('it-IT', {
//     style: 'currency',
//     currency: 'EUR',
//     maximumFractionDigits: 0,
//   });

//   const handleExport = () => {
//     if (onExport) return onExport();
//     addToast('Esporta rapporto', 'info');
//   };
//   const handleEditGlobal = () => {
//     if (onEditGlobal) return onEditGlobal();
//     addToast('Modifica licenziatario', 'info');
//   };
//   const handleEditRow = (row) => {
//     if (onEditRow) return onEditRow(row);
//     addToast(`Modifica: ${row.azienda}`, 'info');
//   };
//   const handleDeleteRow = (row) => {
//     if (onDeleteRow) return onDeleteRow(row);
//     addToast(`Elimina: ${row.azienda}`, 'warning');
//   };

//   return (
//     <div className="rounded-3xl p-4 shadow-sm ring-1 ring-black/5 md:p-6">
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           type={toast.type}
//           message={toast.message}
//           duration={toast.duration}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}
//       <div className="flex flex-wrap items-center gap-3 px-2 md:gap-4">
//         <h2 className="flex-1 text-2xl font-semibold text-gray-900 md:text-[28px]">
//           Gestione dei licenziatari
//         </h2>

//         <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
//           <Search className="h-4 w-4 text-gray-500" />
//           <input
//             type="search"
//             placeholder="Cerca"
//             value={search}
//             className="bg-transparent text-sm outline-none"
//             onChange={(e) => onSearchChange?.(e.target.value)}
//           />
//         </div>

//         <button
//           onClick={handleExport}
//           className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
//         >
//           <Download className="h-5 w-5" />
//           Esporta rapporto
//         </button>

//         <button
//           onClick={handleEditGlobal}
//           className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
//         >
//           <Edit className="h-5 w-5" />
//           Modifica licenziatario
//         </button>
//       </div>

//       {/* Table */}
//       <div className="mt-5 overflow-x-auto">
//         <table className="min-w-full border-separate border-spacing-0">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="sticky top-0 z-[1] rounded-tl-2xl px-4 py-4 text-sm font-semibold text-gray-800">
//                 Azienda
//               </th>
//               <th className="px-4 py-4 text-sm font-semibold text-gray-800">
//                 Fatturato 30 giorni
//               </th>
//               <th className="px-4 py-4 text-sm font-semibold text-gray-800">
//                 Utenti attivi
//               </th>
//               <th className="px-4 py-4 text-sm font-semibold text-gray-800">
//                 Stato
//               </th>
//               <th className="rounded-tr-2xl px-4 py-4 text-sm font-semibold text-gray-800">
//                 Azioni
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r) => (
//               <tr key={r.id || r.userId || r.azienda} className="border-b border-gray-200">
//                 <td className="max-w-[220px] truncate px-4 py-5 text-gray-900">
//                   {r.azienda}
//                 </td>
//                 <td className="px-4 py-5 whitespace-nowrap text-gray-900">
//                   {euro.format(r.fatturato)}
//                 </td>
//                 <td className="px-4 py-5">
//                   <ProgressBar value={r.users ?? r.used ?? 0} max={r.cap || 1} />
//                 </td>
//                 <td className="px-4 py-5">
//                   <StatusPill status={r.stato} />
//                 </td>
//                 <td className="px-4 py-5">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => handleEditRow(r)}
//                       className="text-gray-700 hover:text-gray-900"
//                       title="Modifica"
//                     >
//                       <Pencil className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteRow(r)}
//                       className="text-red-600 hover:text-red-700"
//                       title="Elimina"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { Search, Download, Trash2, Edit, Pencil } from 'lucide-react';
import { Toast, useToast } from '../../../../../components/ui';

const StatusPill = ({ status }) => {
  const map = {
    Attivo: { cls: 'bg-emerald-50 text-emerald-700', label: 'Attivo' },
    'In attesa di': { cls: 'bg-rose-50 text-rose-600', label: 'In attesa di' },
    Inattivo: { cls: 'bg-red-600/10 text-red-600', label: 'Inattivo' },
  };
  const s = map[status] ?? map.Attivo;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
};

const ProgressBar = ({ value, max }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex w-full items-center gap-2 sm:gap-3">
      <div className="h-2 flex-1 sm:w-40 rounded-full bg-emerald-100">
        <div
          className="h-2 rounded-full bg-emerald-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs sm:text-sm whitespace-nowrap text-gray-700">
        {value}/{max}
      </span>
    </div>
  );
};

export default function LicenseeManagement({
  rows = [],
  search = '',
  onSearchChange,
  onExport,
  onEditGlobal,
  onEditRow,
  onDeleteRow,
}) {
  const { toasts, addToast, removeToast } = useToast();
  const euro = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const handleExport = () => {
    if (onExport) return onExport();
    addToast('Esporta rapporto', 'info');
  };
  const handleEditGlobal = () => {
    if (onEditGlobal) return onEditGlobal();
    addToast('Modifica licenziatario', 'info');
  };
  const handleEditRow = (row) => {
    if (onEditRow) return onEditRow(row);
    addToast(`Modifica: ${row.azienda}`, 'info');
  };
  const handleDeleteRow = (row) => {
    if (onDeleteRow) return onDeleteRow(row);
    addToast(`Elimina: ${row.azienda}`, 'warning');
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl p-4 shadow-sm ring-1 ring-black/5 md:p-6 bg-white">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Header Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl md:text-[28px]">
          Gestione dei licenziatari
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search Box */}
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2 w-full sm:w-auto">
            <Search className="h-4 w-4 shrink-0 text-gray-500" />
            <input
              type="search"
              placeholder="Cerca"
              value={search}
              className="w-full bg-transparent text-sm outline-none"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleExport}
              className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-emerald-600 transition"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Esporta rapporto</span>
            </button>

            <button
              onClick={handleEditGlobal}
              className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-emerald-600 transition"
            >
              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Modifica licenziatario</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="mt-6 hidden md:block overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="sticky top-0 z-[1] rounded-tl-2xl px-4 py-4 text-sm font-semibold text-gray-800">
                Azienda
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Fatturato 30 giorni
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Utenti attivi
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Stato
              </th>
              <th className="rounded-tr-2xl px-4 py-4 text-sm font-semibold text-gray-800">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id || r.userId || r.azienda} className="border-b border-gray-200">
                <td className="max-w-[220px] truncate px-4 py-5 text-gray-900 font-medium">
                  {r.azienda}
                </td>
                <td className="px-4 py-5 whitespace-nowrap text-gray-900">
                  {euro.format(r.fatturato)}
                </td>
                <td className="px-4 py-5">
                  <ProgressBar value={r.users ?? r.used ?? 0} max={r.cap || 1} />
                </td>
                <td className="px-4 py-5">
                  <StatusPill status={r.stato} />
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleEditRow(r)}
                      className="text-gray-700 hover:text-gray-900 transition"
                      title="Modifica"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteRow(r)}
                      className="text-red-600 hover:text-red-700 transition"
                      title="Elimina"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Hidden on Desktop) */}
      <div className="mt-4 flex flex-col gap-3 md:hidden">
        {rows.map((r) => (
          <div
            key={r.id || r.userId || r.azienda}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-base">{r.azienda}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Fatturato: <span className="font-medium text-gray-800">{euro.format(r.fatturato)}</span>
                </p>
              </div>
              <StatusPill status={r.stato} />
            </div>

            <div className="mt-3">
              <span className="text-xs text-gray-500 mb-1 block">Utenti attivi</span>
              <ProgressBar value={r.users ?? r.used ?? 0} max={r.cap || 1} />
            </div>

            <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-100 pt-3">
              <button
                onClick={() => handleEditRow(r)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                <Pencil className="h-4 w-4" />
                <span>Modifica</span>
              </button>
              <button
                onClick={() => handleDeleteRow(r)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="h-4 w-4" />
                <span>Elimina</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}