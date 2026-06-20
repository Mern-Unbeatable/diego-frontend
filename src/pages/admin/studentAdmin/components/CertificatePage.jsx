import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CertificateCard from './certificate/CertificateCard';
import EmptyCertificateState from './certificate/EmptyCertificateState';
import { Container } from '../../../../components/ui';

const CertificatePage = () => {
  const navigate = useNavigate();

  // Example certificates data - replace with actual data from API/Redux
  const certificates = [
    {
      id: 1,
      courseTitle: 'Datore di lavoro (Nuovo) 16 ore',
      imageUrl: '/image/student/c_2.png',
      message:
        "Ce l'hai fatta! Il tuo attestato è pronto: clicca qui per scaricarlo.",
    },
    {
      id: 2,
      courseTitle: 'Generale 4 Ore',
      imageUrl: '/image/student/c_1.png',
      message:
        "Ce l'hai fatta! Il tuo attestato è pronto: clicca qui per scaricarlo.",
    },
  ];

  return (
    <Container size="full" className="">
      <div className="">
        {/* Back button */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm hover:bg-gray-50"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          {/* Page title centered */}
          <h2 className="text-center text-2xl font-semibold text-[#252525]">
            Elenco dei certificati
          </h2>
        </div>

        {/* Render all certificates or empty state */}
        {certificates.length > 0 ? (
          <>
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}

            {/* Load more button */}
            <div className="mt-8 flex justify-center">
              <button className="rounded-full bg-[#73BFA1] px-12 py-2.5 font-normal text-white transition-colors hover:bg-[#5fa889]">
                Loadmore
              </button>
            </div>
          </>
        ) : (
          <EmptyCertificateState />
        )}
      </div>
    </Container>
  );
};

export default CertificatePage;
