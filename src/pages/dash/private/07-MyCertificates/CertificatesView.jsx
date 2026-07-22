import React, { useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CertificateCard from './components/CertificateCard';
import EmptyCertificateState from './components/EmptyCertificateState';
import { Container } from '../../../../components/ui';
import Loading from '../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../features/private/privateHooks';

const CertificatesView = () => {
  const navigate = useNavigate();
  const {
    fetchMyCertificates,
    certificates,
    certificatesMeta,
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
    <Container size="full" className="">
      <div className="">
        <div className="mb-10 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm hover:bg-gray-50"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          <h2 className="text-center text-xl font-bold text-[#252525]">
            Elenco dei certificati
          </h2>
        </div>

        {certificatesError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {certificatesError}
          </div>
        )}

        {!certificatesError && certificates.length > 0 ? (
          <>
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={certificatesLoadingMore}
                  className="rounded-full bg-[#73BFA1] px-12 py-2.5 font-normal text-white transition-colors hover:bg-[#5fa889] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {certificatesLoadingMore ? 'Caricamento...' : 'Loadmore'}
                </button>
              </div>
            )}
          </>
        ) : (
          !certificatesError && <EmptyCertificateState />
        )}
      </div>
    </Container>
  );
};

export default CertificatesView;
