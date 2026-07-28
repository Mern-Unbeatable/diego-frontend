import React, { useMemo, useState } from 'react';
import { Star, StarHalf, Trash2, CheckCircle2, Search } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';
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
      <span className="ml-2 text-sm font-medium text-gray-600">
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

export default function FeedbackSection() {
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');

  const queryArgs = useMemo(() => {
    const base = {
      page: 1,
      limit: 50,
      search: search.trim() || undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (activeTab === 'pending') return { ...base, isPublished: false };
    if (activeTab === 'published') return { ...base, isPublished: true };
    return base;
  }, [activeTab, search]);

  const { data, isLoading, isFetching } = useGetAllReviewsQuery(queryArgs);
  const [publishReview, { isLoading: publishing }] = usePublishReviewMutation();
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const reviews = data?.reviews ?? [];
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Feedback del cliente</h1>
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Cerca recensioni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[180px] bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
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
        <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
          Nessuna recensione trovata per questo filtro.
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-emerald-50/40 px-4 py-4 ring-1 ring-emerald-100 md:px-6 md:py-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-1 gap-3">
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(review.name)}`}
                  alt={review.name}
                  className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-gray-900">Ciao, {review.name}!</p>
                    <span className="text-xs text-gray-400">{review.createdAtFormatted}</span>
                  </div>
                  <Rating value={review.rating} />
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-700">
                    {review.message || '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:pl-6">
                {!review.published ? (
                  <button
                    type="button"
                    onClick={() => handlePublish(review.id)}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Pubblica
                  </button>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Pubblicato
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUnpublish(review.id)}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50"
                    >
                      Rimuovi
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(review)}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Cancella
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
