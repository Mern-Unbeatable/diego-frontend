import React, { useEffect, useState } from 'react';
import { Modal } from '../../../../../components/ui';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useUpdateTicketStatusMutation,
} from '../../../../../features/api/ticketApi';
import { buildTicketAnswerPayload, formatTicketDisplayId } from '../../../../../features/api/ticketMappers';
import {
  showSuccessToast,
  showRtkErrorToast,
  showErrorToast,
} from '../../../../../utils/toast/toastAlerts';

export default function TicketDetailModal({ isOpen, onClose, ticketId }) {
  const [response, setResponse] = useState('');

  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketByIdQuery(ticketId, {
    skip: !isOpen || !ticketId,
  });

  const [updateTicket, { isLoading: savingReply }] = useUpdateTicketMutation();
  const [updateTicketStatus, { isLoading: savingStatus }] =
    useUpdateTicketStatusMutation();

  useEffect(() => {
    if (!isOpen) setResponse('');
    else if (ticket?.answer) setResponse(ticket.answer);
  }, [isOpen, ticket?.answer, ticketId]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!ticketId || !response.trim()) {
      showErrorToast('Scrivi una risposta prima di inviare');
      return;
    }

    try {
      await updateTicket({
        id: ticketId,
        ...buildTicketAnswerPayload(response),
      }).unwrap();
      showSuccessToast('Risposta inviata con successo');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleMarkInProgress = async () => {
    if (!ticketId) return;
    try {
      await updateTicketStatus({ id: ticketId, status: 'IN_PROGRESS' }).unwrap();
      showSuccessToast('Ticket segnato come in lavorazione');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleResolve = async () => {
    if (!ticketId) return;
    try {
      if (response.trim()) {
        await updateTicket({
          id: ticketId,
          ...buildTicketAnswerPayload(response),
          status: 'RESOLVED',
        }).unwrap();
      } else {
        await updateTicketStatus({ id: ticketId, status: 'RESOLVED' }).unwrap();
      }
      showSuccessToast('Ticket risolto');
      onClose();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleCloseTicket = async () => {
    if (!ticketId) return;
    try {
      await updateTicketStatus({ id: ticketId, status: 'CLOSED' }).unwrap();
      showSuccessToast('Ticket chiuso');
      onClose();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  if (!isOpen || !ticketId) return null;

  const saving = savingReply || savingStatus;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ticket?.subject || 'Dettaglio ticket'}
      description={
        ticket
          ? `Ticket ${formatTicketDisplayId(ticket)} · ${ticket.createdAtFormatted}`
          : undefined
      }
      size="md"
      zIndex={60}
      accentColor="bg-emerald-500"
    >
      {isLoading ? (
        <Loading size="md" className="min-h-40" />
      ) : isError || !ticket ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          Impossibile caricare il ticket.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {ticket.status}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {ticket.userLevelLabel}
            </span>
            {ticket.tenantName !== '—' && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {ticket.tenantName}
              </span>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 font-semibold text-white">
                {ticket.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{ticket.userName}</h3>
                <p className="text-sm text-gray-500">{ticket.userEmail}</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="leading-relaxed text-gray-800">{ticket.message}</p>
              <p className="mt-3 text-right text-xs text-gray-500">
                {ticket.createdAtFormatted}
              </p>
            </div>
          </div>

          {ticket.answer && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="mb-2 text-sm font-semibold text-emerald-800">
                Risposta precedente
              </p>
              <p className="text-sm text-gray-800">{ticket.answer}</p>
            </div>
          )}

          <form onSubmit={handleSubmitReply} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Risposta amministratore
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Scrivi la tua risposta dettagliata qui..."
                rows={4}
                maxLength={500}
                className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setResponse('')}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancella
              </button>
              <button
                type="button"
                onClick={handleMarkInProgress}
                disabled={saving || ticket.rawStatus === 'IN_PROGRESS'}
                className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 disabled:opacity-50"
              >
                Segna in corso
              </button>
              <button
                type="submit"
                disabled={saving || !response.trim()}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {savingReply ? 'Invio...' : 'Invia risposta'}
              </button>
              <button
                type="button"
                onClick={handleResolve}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Risolvi
              </button>
              <button
                type="button"
                onClick={handleCloseTicket}
                disabled={saving}
                className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Chiudi ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
