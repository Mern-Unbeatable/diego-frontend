import React, { useEffect, useMemo, useState } from 'react';
import { Star, StarHalf, Trash2, CheckCircle2, Search } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';
import Pagination from '../../../../../components/ui/Utilities/Pagination';
import {
  useGetAllReviewsQuery,
  usePublishReviewMutation,
  useDeleteReviewMutation,
} from '../../../../../features/api/reviewApi';
import {
  showSuccessToast,
  showRtkErrorToast,
  showConfirmToast,
} from '../../../../../utils/toast/toastAlerts';

const PAGE_SIZE = 10;

function Rating({ value = 0 }) {
  const stars = useMemo(() => {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return 'full';
      if (i === full && hasHalf) return 'half';
      return 'empty';
    });
  }, [value]);

  return (
    <div className="flex items-center gap-1 text-amber-500">
      {stars.map((type, index) =>
        type === 'full' ? (
          <Star key={index} className="h-4 w-4 fill-current" />
        ) : type === 'half' ? (
          <StarHalf key={index} className="h-4 w-4 fill-current" />
        ) : (
          <Star key={index} className="h-4 w-4" />
        ),
      )}
      <span className="ml-2 text-xs font-medium text-gray-600 sm:text-sm">
        {Number(value).toFixed(1)}/5
      </span>
    </div>
  );
}

const TABS = [
  { id: 'pending', label: 'In attesa' },
  { id: 'published', label: 'Pubblicati' },
  { id: 'all', label: 'Tutti' },
];

const matchesSearch = (review, query) => {
  if (!query) return true;
  const haystack = [review.name, review.message, review.createdAtFormatted]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
};

export default function FeedbackSection() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const queryArgs = useMemo(() => {
    const base = {
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (activeTab === 'pending') return { ...base, isPublished: false };
    if (activeTab === 'published') return { ...base, isPublished: true };
    return base;
  }, [activeTab, search, page]);

  const { data, isLoading, isFetching } = useGetAllReviewsQuery(queryArgs);
  const [publishReview, { isLoading: publishing }] = usePublishReviewMutation();
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const reviews = useMemo(() => {
    let rows = data?.reviews ?? [];
    if (search) {
      const query = search.toLowerCase();
      rows = rows.filter((review) => matchesSearch(review, query));
    }
    return rows;
  }, [data?.reviews, search]);

  const meta = data?.meta ?? {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const total = meta.total ?? reviews.length;
  const totalPages = Math.max(1, meta.totalPages ?? 1);
  const clampedPage = Math.min(page, totalPages);

  const listLoading = isLoading || isFetching;
  const actionLoading = publishing || deleting;

  const handlePublish = async (id) => {
    try {
      await publishReview({
        id,
        isPublished: true,
        isPublic: true,
      }).unwrap();
      showSuccessToast('Recensione pubblicata con successo');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await publishReview({
        id,
        isPublished: false,
        isPublic: false,
      }).unwrap();
      showSuccessToast('Recensione rimossa dalla pubblicazione');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleDelete = async (review) => {
    const confirmed = await showConfirmToast({
      title: 'Elimina recensione',
      message: `Eliminare la recensione di ${review.name}? L'operazione non può essere annullata.`,
      confirmLabel: 'Elimina',
      cancelLabel: 'Annulla',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      await deleteReview(review.id).unwrap();
      showSuccessToast('Recensione eliminata');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const renderActions = (review) => (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:pl-4 lg:pl-6">
      {!review.published ? (
        <button
          type="button"
          onClick={() => handlePublish(review.id)}
          disabled={actionLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 sm:w-auto"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Pubblica
        </button>
      ) : (
        <>
          <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 sm:w-auto">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Pubblicato
          </span>
          <button
            type="button"
            onClick={() => handleUnpublish(review.id)}
            disabled={actionLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50 sm:w-auto"
          >
            Rimuovi
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => handleDelete(review)}
        disabled={actionLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50 sm:w-auto"
      >
        <Trash2 className="h-4 w-4 shrink-0" />
        Cancella
      </button>
    </div>
  );

  return (
    <div className="min-w-0 space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Feedback del cliente
        </h1>
        <div className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-3 py-2 sm:w-auto sm:min-w-[220px]">
          <Search className="h-4 w-4 shrink-0 text-gray-500" />
          <input
            type="search"
            placeholder="Cerca recensioni..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mx-1 flex gap-1 overflow-x-auto px-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-3 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {listLoading ? (
        <Loading size="md" className="min-h-48" />
      ) : reviews.length === 0 ? (
        <div className="rounded-xl bg-white px-4 py-10 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100 sm:p-10">
          {search
            ? 'Nessuna recensione trovata per la ricerca effettuata.'
            : 'Nessuna recensione trovata per questo filtro.'}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl bg-emerald-50/40 px-3 py-3 ring-1 ring-emerald-100 sm:px-4 sm:py-4 md:px-6 md:py-5"
            >
              <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 flex-1 gap-3">
                  <img
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(review.name)}`}
                    alt={review.name}
                    className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-gray-200"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 sm:text-base">
                        Ciao, {review.name}!
                      </p>
                      <span className="text-xs text-gray-400">
                        {review.createdAtFormatted}
                      </span>
                    </div>
                    <Rating value={review.rating} />
                    <p className="mt-2 max-w-3xl text-sm leading-6 break-words text-gray-700">
                      {review.message || '—'}
                    </p>
                  </div>
                </div>

                {renderActions(review)}
              </div>
            </article>
          ))}

          <Pagination
            page={clampedPage}
            totalPages={totalPages}
            total={total}
            limit={PAGE_SIZE}
            onPageChange={setPage}
            className="px-1"
          />
        </div>
      )}
    </div>
  );
}
