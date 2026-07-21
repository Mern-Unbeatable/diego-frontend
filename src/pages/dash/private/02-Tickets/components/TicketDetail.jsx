import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '../../../../../components/ui';
import Loading from '../../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../../features/private/privateHooks';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TicketDetail = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [reply, setReply] = useState('');
  const {
    fetchTicketById,
    clearTicketDetail,
    ticketDetail,
    ticketDetailLoading,
    ticketDetailError,
  } = usePrivate();

  useEffect(() => {
    if (!ticketId) return;

    fetchTicketById(ticketId).catch(() => {});

    return () => {
      clearTicketDetail();
    };
  }, [ticketId, fetchTicketById, clearTicketDetail]);

  const conversation = useMemo(() => {
    if (!ticketDetail) return [];

    const items = [];

    if (ticketDetail.message) {
      items.push({
        id: 'user-message',
        author: ticketDetail.userName || 'Utente',
        timestamp: ticketDetail.createdAt,
        message: ticketDetail.message,
      });
    }

    if (ticketDetail.answer) {
      items.push({
        id: 'support-answer',
        author: 'Supporto',
        timestamp: ticketDetail.updatedAt,
        message: ticketDetail.answer,
      });
    }

    return items;
  }, [ticketDetail]);

  const handleSendReply = () => {
    if (!reply.trim()) {
      alert('Inserisci una risposta');
      return;
    }

    setReply('');
    alert('Risposta inviata!');
  };

  if (ticketDetailLoading) {
    return <Loading size="md" className="min-h-60" />;
  }

  if (ticketDetailError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {ticketDetailError}
      </div>
    );
  }

  if (!ticketDetail) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
        Ticket non trovato
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-8 flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 text-[#2f2f2f] transition hover:text-black"
          aria-label="Torna indietro"
        >
          <FaArrowLeft size={16} />
        </button>
        <h1 className="text-2xl font-semibold text-[#202020]">Area ticket</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-5">
          <section className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#262626] md:text-xl">
              Descrizione ticket
            </h2>
            <p className="leading-relaxed whitespace-pre-line text-[#333] md:text-base">
              {ticketDetail.message}
            </p>

            {ticketDetail.attachments && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-[#262626]">
                  Allegato
                </p>
                <img
                  src={ticketDetail.attachments}
                  alt="Ticket attachment"
                  className="max-h-80 w-full rounded-lg border border-[#e4e4e4] object-cover"
                />
              </div>
            )}
          </section>

          <section className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
            <h2 className="mb-2 text-lg font-semibold text-[#262626] md:text-xl">
              Conversazione
            </h2>
            <div className="mb-3 border-t border-[#ececec] pt-3 text-[11px] text-[#5a5a5a] md:text-sm">
              Update {ticketDetail.updatedAt}
            </div>

            {conversation.length > 0 ? (
              <div className="space-y-4">
                {conversation.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#b9c6cf] text-xs font-semibold text-white">
                      {getInitials(msg.author)}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#222] md:text-[16px]">
                        {msg.author}
                      </p>
                      <p className="mb-1 text-[10px] text-[#9a9a9a] md:text-[12px]">
                        {msg.timestamp}
                      </p>
                      <div className="rounded-md bg-[#edf6f1] p-3">
                        <p className="text-[11px] whitespace-pre-line text-[#2f2f2f] md:text-[14px]">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Nessuna conversazione disponibile
              </p>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#262626] md:text-xl">
              Rispondi
            </h2>
            <textarea
              placeholder="Inserisci la tua risposta..."
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-[#ebf3ef] bg-[#edf6f1] px-4 py-3 text-[13px] placeholder:text-[#96a29d] focus:outline-none"
            />
            <div className="mt-4">
              <Button
                label="Invia"
                className="rounded-full bg-[#73BFA1] hover:bg-[#5fa488]"
                onClick={handleSendReply}
              />
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-md border border-[#e4e4e4] bg-white p-5 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#262626] md:text-xl">
              Dettagli ticket
            </h2>
            <div className="space-y-2 leading-relaxed text-[#2f2f2f] md:text-base">
              <p>
                <span className="font-semibold">ID:</span> {ticketDetail.id}
              </p>
              <p>
                <span className="font-semibold">Oggetto:</span>{' '}
                {ticketDetail.subject}
              </p>
              <p>
                <span className="font-semibold">Stato:</span>{' '}
                {ticketDetail.status}
              </p>
              <p>
                <span className="font-semibold">Creato il:</span>{' '}
                {ticketDetail.createdAt}
              </p>
              <p>
                <span className="font-semibold">Aggiornato il:</span>{' '}
                {ticketDetail.updatedAt}
              </p>
              {ticketDetail.userName && (
                <p>
                  <span className="font-semibold">Nominativo:</span>{' '}
                  {ticketDetail.userName}
                </p>
              )}
              {ticketDetail.userEmail && (
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  {ticketDetail.userEmail}
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;
