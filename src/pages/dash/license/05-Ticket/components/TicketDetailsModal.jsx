import { UsersRound } from 'lucide-react';
import Modal from '../../../../../components/ui/modals/Modal';
import Loading from '../../../../../components/ui/Utilities/Loading';
import { useGetMyTicketByIdQuery } from '../../../../../features/api/licenseUserApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import { formatTicketDisplayId } from '../../../../../features/api/ticketMappers';

const TicketDetailsModal = ({ open, ticketId, onClose }) => {
  const { data: ticket, isLoading, isError, error } = useGetMyTicketByIdQuery(ticketId, {
    skip: !open || !ticketId,
  });

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Area ticket"
      size="xl"
      panelClassName="max-w-xl"
      zIndex={50}
    >
      {isLoading ? (
        <Loading size="md" className="min-h-40" />
      ) : isError ? (
        <p className="text-sm text-red-600">{getRtkErrorMessage(error)}</p>
      ) : ticket ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
            <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Descrizione ticket</h3>
            <div className="space-y-4 text-sm whitespace-pre-wrap text-[#3e3e3e]">
              {ticket.message || 'Nessuna descrizione disponibile'}
            </div>
            {ticket.answer ? (
              <div className="mt-6 rounded-md bg-[#edf5f2] p-4 text-sm text-[#4e4e4e]">
                <p className="mb-2 font-semibold text-[#2b2b2b]">Risposta supporto</p>
                {ticket.answer}
              </div>
            ) : null}
          </article>

          <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
            <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Dettagli ticket</h3>
            <div className="space-y-3 text-sm text-[#3f3f3f]">
              <p>
                <span className="font-semibold">ID:</span> {formatTicketDisplayId(ticket)}
              </p>
              <p>
                <span className="font-semibold">Oggetto:</span> {ticket.subject}
              </p>
              <p>
                <span className="font-semibold">Tipologia richiedente:</span>{' '}
                {ticket.userLevelLabel}
              </p>
              <p>
                <span className="font-semibold">Creato il:</span> {ticket.createdAtFormatted}
              </p>
              <p>
                <span className="font-semibold">Nominativo:</span> {ticket.userName}
              </p>
              <p>
                <span className="font-semibold">Stato:</span> {ticket.status}
              </p>
            </div>
          </article>

          {ticket.answer ? (
            <article className="rounded-xl border border-[#e8e8e8] bg-white p-5 xl:col-span-2">
              <h3 className="mb-5 border-b border-[#ececec] pb-4 text-lg font-semibold text-[#1f1f1f]">
                Conversazione
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                    <UsersRound size={14} />
                  </span>
                  Supporto
                </p>
                <p className="text-sm text-[#8f8f8f]">{ticket.updatedAtFormatted}</p>
                <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
                  {ticket.answer}
                </div>
              </div>
            </article>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[#7a7a7a]">Ticket non trovato</p>
      )}
    </Modal>
  );
};

export default TicketDetailsModal;
