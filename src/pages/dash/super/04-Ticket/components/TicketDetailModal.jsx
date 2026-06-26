import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TicketDetailModal({
  isOpen,
  onClose,
  ticket,
  onMarkInProgress,
  onSaveResponse,
}) {
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveResponse && response.trim()) {
      onSaveResponse(ticket.id, response);
      setResponse('');
    }
  };

  const handleMarkInProgress = () => {
    if (onMarkInProgress) {
      onMarkInProgress(ticket.id);
    }
  };

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">
                {ticket.problema || 'Problema di accesso al corso'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                Ticket ID: TK{String(ticket.id).padStart(3, '0')}
              </span>
              <span className="text-sm text-gray-500">
                Creato il {ticket.data || '12/07/2000'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 font-semibold text-white">
              {(ticket.utente || 'Michael Johnson').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {ticket.utente || 'Michael Johnson'}
              </h3>
              <p className="text-sm text-gray-500">Cliente</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
            <div className="ml-6 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
              <p className="leading-relaxed text-gray-800">
                {ticket.descrizione ||
                  'Non riesco ad accedere al corso JavaScript avanzato. Ricevo un errore quando clicco sul link.'}
              </p>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600">
                  {ticket.data || '12/07/2000'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Response Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Risposta dell'amministratore
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Scrivi la tua risposta dettagliata qui..."
                rows={4}
                className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-colors duration-200 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {response.length}/500
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                <span>
                  {response.length > 0
                    ? `Bozza salvata automaticamente`
                    : 'Ultima modifica: 09/07/2000'}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setResponse('')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                >
                  Cancella
                </button>
                <button
                  type="button"
                  onClick={handleMarkInProgress}
                  className="rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                >
                  Segna in corso
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Previous Responses (if any) */}
        {ticket.risposte && ticket.risposte.length > 0 && (
          <div className="border-t-2 border-gray-100 pt-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <h4 className="text-lg font-semibold text-gray-900">
                Cronologia risposte
              </h4>
            </div>
            <div className="space-y-3">
              {ticket.risposte.map((risposta, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
                  <div className="ml-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
                    <div className="mb-2 flex items-center space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                        A
                      </div>
                      <span className="text-sm font-medium text-emerald-800">
                        Admin
                      </span>
                      <span className="text-xs text-emerald-600">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-800">
                      {risposta.testo}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <span className="inline-flex items-center rounded-md border border-emerald-300 bg-white px-2 py-1 text-xs font-medium text-emerald-700">
                        {risposta.data}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
