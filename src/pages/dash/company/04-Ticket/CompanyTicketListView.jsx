import {
  BellRing,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Search,
  TicketPlus,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/ui/Utilities/Loading';
import { useGetTicketsQuery } from '../../../../features/api/ticketApi';
import {
  getTicketBadgeTone,
  mapTicketPriorityLabel,
} from '../../../../features/api/ticketMappers';
import { getRtkErrorMessage } from '../../../../features/api/utils';

const STATUS_OPTIONS = [
  { label: 'Tutti', value: '' },
  { label: 'Aperto', value: 'OPEN' },
  { label: 'In lavorazione', value: 'IN_PROGRESS' },
];

const PRIORITY_OPTIONS = [
  { label: 'Tutte', value: '' },
  { label: 'Critical', value: 'CRITICAL' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
];

const normalizeSearchValue = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim();

const extractDigits = (value) => normalizeSearchValue(value).replace(/\D+/g, '');

const CompanyTicketListView = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const { data, isLoading, isError, error, refetch } = useGetTicketsQuery({
    page: 1,
    limit: 50,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });

  const mappedTickets = useMemo(
    () =>
      (data?.tickets ?? []).map((ticket) => ({
        id: ticket.id,
        displayId: ticket.displayId,
        title: ticket.subject,
        requester: ticket.userName,
        priority: mapTicketPriorityLabel(ticket.priority),
        status: ticket.status,
        updatedAt: ticket.updatedAtFormatted,
        badgeTone: getTicketBadgeTone(ticket.rawStatus),
      })),
    [data?.tickets],
  );

  const tickets = useMemo(() => {
    if (!search) {
      return mappedTickets;
    }

    const query = normalizeSearchValue(search);
    const queryDigits = extractDigits(search);

    return mappedTickets.filter((ticket) => {
      const searchableText = [ticket.displayId, ticket.title, ticket.requester]
        .map((value) => normalizeSearchValue(value))
        .join(' ');

      if (searchableText.includes(query)) {
        return true;
      }

      if (!queryDigits) {
        return false;
      }

      return extractDigits(ticket.displayId).includes(queryDigits);
    });
  }, [mappedTickets, search]);

  const handleReset = () => {
    setSearchInput('');
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#7d7d7d]">Area ticket</p>
          <h2 className="text-[42px] font-semibold text-[#1f1f1f]">Elenco ticket</h2>
        </div>

        <Link
          to="/dashboard/company-admin/ticket/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
        >
          <TicketPlus size={16} /> Nuovo ticket
        </Link>
      </div>

      <section className="rounded-xl border border-[#e8e8e8] bg-white p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#868686]">Cerca ticket</span>
            <div className="flex h-10 items-center rounded-full border border-[#e5e5e5] bg-white px-4">
              <Search size={16} className="text-[#9ca3af]" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="ml-2 w-full text-sm outline-none placeholder:text-[#a3a3a3]"
                placeholder="Cerca per oggetto, ID o nominativo"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#868686]">Stato</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#868686]">Priorità</span>
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={handleReset}
            className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]"
          >
            Reset
          </button>
        </div>
      </section>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {getRtkErrorMessage(error)}
          <button type="button" onClick={refetch} className="ml-3 font-semibold underline">
            Riprova
          </button>
        </div>
      )}

      {isLoading ? (
        <Loading size="md" className="min-h-60" />
      ) : (
        <section className="space-y-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/dashboard/company-admin/ticket/${ticket.id}`}
                className="block rounded-xl border border-[#e8e8e8] bg-white p-5 transition hover:border-[#73bfa1] hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1f1f1f]">
                      <BellRing size={18} className="text-[#73bfa1]" />
                      <p className="text-[30px] font-semibold">{ticket.displayId}</p>
                    </div>
                    <p className="max-w-[960px] text-[18px] font-medium text-[#3a3a3a]">
                      {ticket.title}
                    </p>
                    <p className="text-sm text-[#7d7d7d]">Richiedente: {ticket.requester}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${ticket.badgeTone}`}
                    >
                      {ticket.status}
                    </span>
                    <ChevronRight size={20} className="text-[#b5b5b5]" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#666666]">
                  <span className="inline-flex items-center gap-2">
                    <CircleAlert size={14} className="text-[#e59a2b]" /> Priorità:{' '}
                    {ticket.priority}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CircleCheck size={14} className="text-[#57a080]" /> Aggiornato:{' '}
                    {ticket.updatedAt}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-[#d7d7d7] bg-white px-5 py-10 text-center text-sm text-[#7d7d7d]">
              Nessun ticket trovato.
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default CompanyTicketListView;
