import React from 'react';
import {
  X,
  Calendar,
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

export default function LicenseDetailsModal({
  isOpen,
  onClose,
  license,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !license) return null;

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'attivo':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'in attesa':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'inattivo':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      attivo: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'in attesa': 'bg-orange-100 text-orange-800 border-orange-200',
      inattivo: 'bg-red-100 text-red-800 border-red-200',
    };

    return statusMap[status?.toLowerCase()] || statusMap['attivo'];
  };

  const usagePercentage = Math.round((license.used / license.cap) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-gray-100 bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-xl">
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-4 text-white sm:px-8 sm:py-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-start gap-2 sm:items-center sm:gap-3">
                <Building2 className="mt-0.5 h-6 w-6 shrink-0 sm:mt-0 sm:h-8 sm:w-8" />
                <h1 className="break-words text-lg font-bold sm:text-2xl">
                  {license.azienda}
                </h1>
              </div>
              <div className="flex flex-col gap-2 text-emerald-100 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(license.stato)}
                  <span className="text-xs font-medium sm:text-sm">
                    Licenza {license.stato}
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0" />
                  <span className="truncate text-xs sm:text-sm">
                    {license.subdomain ||
                      license.azienda.toLowerCase().replace(/\s+/g, '')}
                    .unosicurezza.com
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg p-2 text-white/80 transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Status and Usage Overview */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-3">
            {/* Status Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Stato Licenza
                </h3>
                {getStatusIcon(license.stato)}
              </div>
              <div
                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getStatusBadge(license.stato)}`}
              >
                {license.stato || 'Attivo'}
              </div>
            </div>

            {/* Usage Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Utilizzo
                </h3>
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utenti registrati</span>
                  <span className="font-medium">
                    {license.used}/{license.cap}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      usagePercentage >= 90
                        ? 'bg-red-500'
                        : usagePercentage >= 70
                          ? 'bg-orange-500'
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {usagePercentage}% utilizzato
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Fatturato
                </h3>
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {new Intl.NumberFormat('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(license.fatturato || 0)}
                </div>
                <div className="text-sm text-gray-600">Ultimi 30 giorni</div>
              </div>
            </div>
          </div>

          {/* License Information */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Company Details */}
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <div className="mb-2 flex items-center space-x-2 sm:mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Dettagli Azienda
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Nome Azienda
                    </div>
                    <div className="break-words text-sm text-gray-900 sm:text-base">
                      {license.azienda}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Email
                    </div>
                    <div className="break-all text-sm text-gray-900 sm:text-base">
                      {license.email ||
                        'info@' +
                          license.azienda.toLowerCase().replace(/\s+/g, '') +
                          '.it'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Telefono
                    </div>
                    <div className="text-sm text-gray-900 sm:text-base">
                      {license.phone || '+39 XXX XXX XXXX'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Globe className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Sottodominio
                    </div>
                    <div className="break-all text-sm text-gray-900 sm:text-base">
                      {license.subdomain ||
                        license.azienda.toLowerCase().replace(/\s+/g, '')}
                      .unosicurezza.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* License Configuration */}
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <div className="mb-2 flex items-center space-x-2 sm:mb-4">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Configurazione Licenza
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Tipo Piano
                    </div>
                    <div className="break-words text-sm text-gray-900 sm:text-base">
                      {license.plan || 'Standard (100 utenti)'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Data Attivazione
                    </div>
                    <div className="text-sm text-gray-900 sm:text-base">
                      {license.activatedAt || '01/01/2025'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Data Scadenza
                    </div>
                    <div className="text-sm text-gray-900 sm:text-base">
                      {license.expiresAt || '31/12/2025'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                      Ultimo Accesso
                    </div>
                    <div className="text-sm text-gray-900 sm:text-base">
                      {license.lastAccess || '2 ore fa'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
            <div className="text-xs text-gray-500 sm:text-sm">
              Licenza creata il {license.createdAt || '15/10/2024'}
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
              <button
                onClick={() => onDelete && onDelete(license)}
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none sm:w-auto sm:py-2"
              >
                Elimina Licenza
              </button>
              <button
                onClick={() => onEdit && onEdit(license)}
                className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-6 sm:py-2"
              >
                Modifica Licenza
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
