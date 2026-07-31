import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const getStatusClass = (status) => {
  if (status === 'Aperto') return 'bg-[#fce8e6] text-[#d9534f]';
  if (status === 'In lavorazione') return 'bg-[#fdf2df] text-[#e59a2b]';
  return 'bg-[#e6f6ef] text-[#57a080]';
};

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
    if (!ticketId) return undefined;

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
    if (!reply.trim()) return;
    setReply('');
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
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
        Ticket non trovato
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-4 sm:space-y-6">
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] text-[#2f2f2f] hover:bg-[#e5f3ed]"
          aria-label="Torna indietro"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-semibold text-[#202020] sm:text-lg">
          Area ticket
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(240px,0.8fr)] lg:gap-8">
        <div className="order-2 min-w-0 space-y-4 sm:space-y-5 lg:order-1">
          <section className="rounded-xl border border-[#e4e4e4] bg-white p-4 sm:p-5 md:p-6">
            <h2 className="mb-3 text-sm font-semibold text-[#262626] sm:text-base">
              Descrizione ticket
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line text-[#333]">
              {ticketDetail.message}
            </p>

            {ticketDetail.attachments ? (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-[#262626]">
                  Allegato
                </p>
                <img
                  src={ticketDetail.attachments}
                  alt="Ticket attachment"
                  className="max-h-72 w-full rounded-lg border border-[#e4e4e4] object-cover sm:max-h-80"
                />
              </div>
            ) : null}
          </section>

          <section className="rounded-xl border border-[#e4e4e4] bg-white p-4 sm:p-5 md:p-6">
            <h2 className="mb-2 text-sm font-semibold text-[#262626] sm:text-base">
              Conversazione
            </h2>
            <div className="mb-3 border-t border-[#ececec] pt-3 text-xs text-[#5a5a5a]">
              Update {ticketDetail.updatedAt}
            </div>

            {conversation.length > 0 ? (
              <div className="space-y-4">
                {conversation.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b9c6cf] text-xs font-semibold text-white">
                      {getInitials(msg.author)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#222]">
                        {msg.author}
                      </p>
                      <p className="mb-1 text-xs text-[#9a9a9a]">
                        {msg.timestamp}
                      </p>
                      <div className="rounded-lg bg-[#edf6f1] p-3">
                        <p className="text-sm leading-relaxed whitespace-pre-line text-[#2f2f2f]">
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

          <section className="rounded-xl border border-[#e4e4e4] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#262626] sm:text-base">
              Rispondi
            </h2>
            <textarea
              placeholder="Inserisci la tua risposta..."
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-[#ebf3ef] bg-[#edf6f1] px-3 py-2.5 text-sm placeholder:text-[#96a29d] outline-none focus:ring-2 focus:ring-[#73BFA1]"
            />
            <div className="mt-3">
              <button
                type="button"
                onClick={handleSendReply}
                disabled={!reply.trim()}
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73BFA1] px-6 text-sm font-semibold text-white hover:bg-[#5fa488] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Invia
              </button>
            </div>
          </section>
        </div>

        <aside className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-[#e4e4e4] bg-white p-4 sm:p-5 md:p-6">
            <h2 className="mb-3 text-sm font-semibold text-[#262626] sm:text-base">
              Dettagli ticket
            </h2>
            <dl className="space-y-2.5 text-sm text-[#2f2f2f]">
              <div className="flex flex-wrap items-center gap-2">
                <dt className="font-semibold">ID:</dt>
                <dd>{ticketDetail.displayId}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Oggetto: </dt>
                <dd className="inline break-words">{ticketDetail.subject}</dd>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <dt className="font-semibold">Stato:</dt>
                <dd>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(ticketDetail.status)}`}
                  >
                    {ticketDetail.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold">Creato il: </dt>
                <dd className="inline">{ticketDetail.createdAt}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Aggiornato il: </dt>
                <dd className="inline">{ticketDetail.updatedAt}</dd>
              </div>
              {ticketDetail.userName ? (
                <div>
                  <dt className="inline font-semibold">Nominativo: </dt>
                  <dd className="inline">{ticketDetail.userName}</dd>
                </div>
              ) : null}
              {ticketDetail.userEmail ? (
                <div className="break-all">
                  <dt className="inline font-semibold">Email: </dt>
                  <dd className="inline">{ticketDetail.userEmail}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;
