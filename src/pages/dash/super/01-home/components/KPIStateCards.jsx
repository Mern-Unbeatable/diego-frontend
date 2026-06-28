import React from 'react';
import {
  DollarSign,
  Users,
  FileText,
  Activity,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';

// ONE-FUNCTION VERSION — no extra components
export default function KPIStateCards({
  revenue30d = 247650,
  revenueTrend = 12,
  activeUsers = 47650,
  usersTrend = 12,
  licenses = { total: 156, active: 142, trial: 14, trend: 12 },
  health = 99.97,
  uptime = 0.02,
  totalCourses = 10,
  onAddCourse = () => alert('Azione: aggiungi nuovo corso'),
}) {
  const euro = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
  const fmt = new Intl.NumberFormat('it-IT');

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Card: Fatturato piattaforma */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-200 text-emerald-700">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-base font-medium text-gray-700">
                Fatturato piattaforma
              </h4>
              <div className="text-2xl font-semibold text-gray-900">
                {euro.format(revenue30d)}
              </div>
              <p className="mt-1 text-sm text-gray-500">30 giorni</p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1 text-sm text-gray-600">
              <span className="font-medium">+{revenueTrend}%</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card: Totale utenti attivi */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-200 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-base font-medium text-gray-700">
                Totale utenti attivi
              </h4>
              <div className="text-2xl font-semibold text-gray-900">
                {fmt.format(activeUsers)}
              </div>
              <p className="mt-1 text-sm text-gray-500">In tutto</p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1 text-sm text-gray-600">
              <span className="font-medium">+{usersTrend}%</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card: Totale licenze */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-200 text-emerald-700">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-base font-medium text-gray-700">
                Totale licenze
              </h4>
              <div className="text-2xl font-semibold text-gray-900">
                {fmt.format(licenses.total)}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {fmt.format(licenses.active)} attivi,{' '}
                {fmt.format(licenses.trial)} in prova
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1 text-sm text-gray-600">
              <span className="font-medium">+{licenses.trend}%</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card: Stato di salute */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-200 text-emerald-700">
              <Activity className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-base font-medium text-gray-700">
                Stato di salute
              </h4>
              <div className="text-2xl font-semibold text-gray-900">
                {health.toFixed(2)}%
              </div>
              <p className="mt-1 text-sm text-gray-500">Tempo di attività</p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1 text-sm text-gray-600">
              <span className="font-medium">{uptime.toFixed(2)}%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card: Corso totale che carichi */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
          <h4 className="mb-1 text-base font-medium text-gray-700">
            Corso totale che carichi
          </h4>
          <div className="text-2xl font-semibold text-gray-900">
            {fmt.format(totalCourses)}
          </div>
          <div className="mt-5">
            <button
              onClick={onAddCourse}
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <PlusCircle className="mr-2 inline h-5 w-5" />
              Aggiungi nuovo corso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
