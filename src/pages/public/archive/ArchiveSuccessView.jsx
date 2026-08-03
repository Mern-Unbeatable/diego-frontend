import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../config/routes';
import { verifyArchivePaymentIntentService } from '../../../features/archive/archiveService';

const ArchiveSuccessView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const paymentIntentId = searchParams.get('payment_intent_id');

  useEffect(() => {
    const verify = async () => {
      if (!paymentIntentId && !sessionId) return;
      try {
        if (paymentIntentId) {
          await verifyArchivePaymentIntentService(paymentIntentId);
        }
        toast.success('Archivio cloud attivato');
      } catch {
        toast.error('Verifica pagamento in corso. Controlla i certificati tra qualche minuto.');
      }
    };
    verify();
  }, [paymentIntentId, sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f7f5] p-6">
      <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#1f1f1f]">Pagamento completato</h1>
        <p className="mt-2 text-sm text-[#666]">
          Il tuo servizio di archiviazione cloud è stato attivato.
        </p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.PRIVATE_USER.CERTIFICATES)}
          className="mt-6 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
        >
          Vai ai certificati
        </button>
        <Link to={ROUTES.PRIVATE_USER.ARCHIVE} className="mt-3 block text-sm text-[#73bfa1]">
          Dettagli archivio
        </Link>
      </div>
    </div>
  );
};

export default ArchiveSuccessView;
