import { Download, Printer } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ENV_CONFIG } from '../../../../config/env.config';
import {
  downloadEmployeeCertificateService,
  getCompanyCertificatesService,
  getCompanyCoursesService,
} from '../../../../features/company/companyService';

const PAGE_SIZE = 6;

const resolveAssetUrl = (path) => {
  if (!path) return '/image/student/c_1.png';
  if (path.startsWith('http')) return path;
  const base = ENV_CONFIG.API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

const CompanyCertificatesView = () => {
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState('');
  const [search, setSearch] = useState('');
  const [actionId, setActionId] = useState(null);

  const loadCourses = useCallback(async () => {
    try {
      const data = await getCompanyCoursesService();
      setCourses(data?.courses ?? []);
    } catch {
      setCourses([]);
    }
  }, []);

  const loadCertificates = useCallback(async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const data = await getCompanyCertificatesService({
        page,
        limit: PAGE_SIZE,
        courseId: filters.courseId || undefined,
        search: filters.search || undefined,
      });
      setCertificates(data?.certificates ?? []);
      setMeta(data?.meta ?? { page, total: 0, totalPages: 1 });
    } catch (error) {
      toast.error(error?.message || 'Impossibile caricare gli attestati');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    loadCertificates(1, { courseId, search });
  }, [courseId, search, loadCertificates]);

  const courseOptions = useMemo(
    () => [{ courseId: '', courseTitle: 'Tutti i corsi' }, ...courses],
    [courses],
  );

  const handleReset = () => {
    setCourseId('');
    setSearch('');
  };

  const handleDownload = async (certificate) => {
    const userId = certificate.employee?.userId;
    if (!userId || !certificate.id) return;
    try {
      setActionId(certificate.id);
      const data = await downloadEmployeeCertificateService(userId, certificate.id);
      const pdfUrl = resolveAssetUrl(data?.pdfUrl || certificate.pdfUrl);
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error(error?.message || 'Download attestato non riuscito');
    } finally {
      setActionId(null);
    }
  };

  const handlePrint = async (certificate) => {
    await handleDownload(certificate);
  };

  const from = meta.total === 0 ? 0 : (meta.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(meta.page * PAGE_SIZE, meta.total);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">
        Elenco degli attestati
      </h2>

      <section className="rounded-xl border border-[#e8e8e8] bg-white p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div>
            <p className="mb-1 text-sm font-medium text-[#868686]">Corso</p>
            <select
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              {courseOptions.map((course) => (
                <option key={course.courseId || 'all'} value={course.courseId}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-[#868686]">
              Cerca partecipante
            </p>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="cerca per nome..."
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <p className="text-sm text-gray-500">Caricamento attestati...</p>
      ) : certificates.length === 0 ? (
        <p className="rounded-xl border border-[#ececec] bg-white p-6 text-sm text-gray-600">
          Nessun attestato trovato per i filtri selezionati.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {certificates.map((certificate) => (
            <article key={certificate.id} className="space-y-4">
              <div className="rounded-xl bg-[#edf5f2] p-5">
                <p className="text-sm text-[#202020]">
                  <span className="font-semibold">Nominativo utente:</span>{' '}
                  {certificate.employee?.fullName || '—'}
                </p>
                <p className="mt-1 text-sm text-[#202020]">
                  <span className="font-semibold">ID corsista:</span>{' '}
                  {certificate.employee?.userId?.slice(0, 8) || '—'}
                </p>
                <p className="mt-1 text-sm text-[#202020]">
                  <span className="font-semibold">Corso:</span>{' '}
                  {certificate.course?.title || '—'}
                </p>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#23473f]">
                <img
                  src={resolveAssetUrl(certificate.pdfUrl)}
                  alt="Certificato"
                  className="h-[200px] w-full object-cover opacity-80"
                  onError={(event) => {
                    event.currentTarget.src = '/images/icons/title.png';
                    event.currentTarget.className =
                      'h-[200px] w-full object-contain bg-[#1f3f38] p-8';
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={actionId === certificate.id}
                  onClick={() => handlePrint(certificate)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c] disabled:opacity-60"
                >
                  <Printer size={14} /> Stampa
                </button>
                <button
                  type="button"
                  disabled={actionId === certificate.id}
                  onClick={() => handleDownload(certificate)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c] disabled:opacity-60"
                >
                  <Download size={14} /> Scarica
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <footer className="flex flex-wrap items-center justify-between border-t border-[#ececec] pt-4 text-sm text-[#7d7d7d]">
        <p>
          Mostra {from}-{to} di {meta.total} certificati
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={meta.page <= 1 || loading}
            onClick={() => loadCertificates(meta.page - 1, { courseId, search })}
          >
            Precedente
          </button>
          <span className="h-6 min-w-6 rounded bg-[#73bfa1] px-2 text-center text-sm font-semibold leading-6 text-white">
            {meta.page}
          </span>
          <button
            type="button"
            disabled={meta.page >= meta.totalPages || loading}
            onClick={() => loadCertificates(meta.page + 1, { courseId, search })}
          >
            Prossimo
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CompanyCertificatesView;
