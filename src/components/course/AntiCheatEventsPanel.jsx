import { ShieldAlert } from 'lucide-react';
import { getAntiCheatEventLabel } from '../../features/learning/trackingConstants';

const formatEventDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AntiCheatEventsPanel = ({ antiCheat }) => {
  const totalEvents = antiCheat?.totalEvents ?? 0;
  const recentEvents = antiCheat?.recent ?? [];

  return (
    <section className="rounded-xl border border-[#f0d9d9] bg-[#fff8f8] p-4 sm:rounded-2xl sm:p-5">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 shrink-0 text-[#c24141]" size={18} />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-[#252525] sm:text-lg">
            Monitoraggio anti-cheating
          </h3>
          <p className="mt-1 text-xs text-[#6b4f4f] sm:text-sm">
            Eventi registrati durante la fruizione del corso (conservati fino a 5 anni).
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-white px-3 py-3 sm:mt-4 sm:px-4">
        <p className="text-sm text-[#5a5a5a]">
          Totale eventi sospetti:{' '}
          <span className="font-semibold text-[#1f1f1f]">{totalEvents}</span>
        </p>
        {totalEvents === 0 ? (
          <p className="mt-2 text-sm text-[#55B18D]">
            Nessun evento anti-cheating registrato per questo corso.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#ececec] text-[#6b6b6b]">
                  <th className="px-2 py-2 font-semibold">Evento</th>
                  <th className="px-2 py-2 font-semibold">Data</th>
                  <th className="px-2 py-2 font-semibold">Lezione</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-[#f4f4f4]">
                    <td className="px-2 py-3 font-medium text-[#2f2f2f]">
                      {getAntiCheatEventLabel(event.eventType)}
                    </td>
                    <td className="px-2 py-3 text-[#5a5a5a]">
                      {formatEventDate(event.occurredAt)}
                    </td>
                    <td className="px-2 py-3 text-[#5a5a5a]">
                      {event.lessonId ? `${event.lessonId.slice(0, 8)}…` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalEvents > recentEvents.length ? (
              <p className="mt-3 text-xs text-[#7a7a7a]">
                Mostrati gli ultimi {recentEvents.length} eventi su {totalEvents}.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default AntiCheatEventsPanel;
