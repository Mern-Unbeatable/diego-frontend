import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

const ArchiveCancelView = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f3f7f5] p-6">
    <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-[#1f1f1f]">Pagamento annullato</h1>
      <p className="mt-2 text-sm text-[#666]">
        Non è stato addebitato alcun importo. Puoi riprovare quando vuoi.
      </p>
      <Link
        to={ROUTES.PRIVATE_USER.ARCHIVE}
        className="mt-6 inline-block rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
      >
        Torna all&apos;archivio
      </Link>
    </div>
  </div>
);

export default ArchiveCancelView;
