import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import CertificateCard from './components/CertificateCard';
import EmptyCertificateState from './components/EmptyCertificateState';
import Loading from '../../../../components/ui/Utilities/Loading';
import { resolveArchiveRoutes } from '../../../../features/archive/archiveRoutes';
import { usePrivate } from '../../../../features/private/privateHooks';

const CertificatesView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { archive: archiveRoute } = useMemo(
    () => resolveArchiveRoutes(location.pathname),
    [location.pathname],
  );
  const {
    fetchMyCertificates,
    certificates,
    certificatesMeta,
    certificatesArchive,
    certificatesLoading,
    certificatesLoadingMore,
    certificatesError,
  } = usePrivate();

  useEffect(() => {
    fetchMyCertificates().catch(() => {});
  }, [fetchMyCertificates]);

  const hasMore = certificatesMeta.page < certificatesMeta.totalPages;

  const handleLoadMore = () => {
    if (!hasMore || certificatesLoadingMore) return;

    fetchMyCertificates({
      page: certificatesMeta.page + 1,
    }).catch(() => {});
  };

  if (certificatesLoading && certificates.length === 0) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Torna indietro"
          className="absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm hover:bg-[#e5f3ed]"
        >
          <FaChevronLeft className="text-sm text-gray-600" />
        </button>
        <h1 className="px-10 text-center text-base font-semibold text-[#252525] sm:text-lg">
          Elenco dei certificati
        </h1>
      </div>

      {certificatesError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {certificatesError}
        </div>
      ) : null}

      {!certificatesArchive?.hasActiveSubscription && certificates.length > 0 ? (
        <div className="rounded-xl border border-[#9fd9c1] bg-[#f3f7f5] px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1f1f1f] sm:text-base">
                Archivio attestati cloud
              </p>
              <p className="mt-1 text-sm text-[#666]">
                Scarica i tuoi attestati oltre i{' '}
                {certificatesArchive?.freeDownloadDays || 30} giorni gratuiti.
                Conservazione legale 5 anni sui nostri server.
              </p>
            </div>
            <Link
              to={archiveRoute}
              className="inline-flex h-10 w-full shrink-0 items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-semibold text-white hover:bg-[#63a88c] sm:w-auto"
            >
              Acquista archivio
            </Link>
          </div>
        </div>
      ) : null}

      {certificatesArchive?.hasActiveSubscription ? (
        <div className="rounded-xl bg-[#e6f6ef] px-4 py-3 text-sm text-[#2d5f49] sm:px-5">
          Archivio cloud attivo
          {certificatesArchive.expiresAt ? (
            <span>
              {' '}
              fino al{' '}
              {new Date(certificatesArchive.expiresAt).toLocaleDateString('it-IT')}
            </span>
          ) : null}
        </div>
      ) : null}

      {!certificatesError && certificates.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              archiveRoute={archiveRoute}
            />
          ))}

          {hasMore ? (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={certificatesLoadingMore}
                className="inline-flex h-10 w-full max-w-xs items-center justify-center rounded-full bg-[#73BFA1] px-8 text-sm font-medium text-white transition-colors hover:bg-[#5fa889] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {certificatesLoadingMore ? 'Caricamento...' : 'Carica altri'}
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        !certificatesError && <EmptyCertificateState />
      )}
    </div>
  );
};

export default CertificatesView;
