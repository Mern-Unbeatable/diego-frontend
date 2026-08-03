import { Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ENV_CONFIG } from '../../../../config/env.config';
import { ROUTES } from '../../../../config/routes';
import { mapCompanyCertificatesResponse } from '../../../../features/company/companyCertificateMappers';
import {
  downloadCompanyCertificateService,
  getCompanyCertificatesService,
  getCompanyCoursesService,
} from '../../../../features/company/companyService';
import CertificatePreview from './components/CertificatePreview';

const PAGE_SIZE = 6;

const ARCHIVE_FILTER_OPTIONS = [
  { value: '', label: 'Tutti gli attestati' },
  { value: 'active', label: 'Periodo gratuito attivo' },
  { value: 'archived', label: 'In archivio cloud' },
];

const resolveAssetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const base = ENV_CONFIG.API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

const getArchiveBadge = (certificate) => {
  if (certificate.archived) {
    return {
      label: 'In archivio cloud',
      className: 'bg-[#ede7f6] text-[#5e35b1]',
    };
  }
  if (certificate.isExpired) {
    return {
      label: 'Periodo gratuito scaduto',
      className: 'bg-[#fff3e0] text-[#e65100]',
    };
  }
  return {
    label: 'Disponibile',
    className: 'bg-[#e6f6ef] text-[#2d5f49]',
  };
};

const CompanyCertificatesView = () => {
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [archiveInfo, setArchiveInfo] = useState({
    hasActiveSubscription: false,
    expiresAt: null,
    freeDownloadDays: 30,
    plan: null,
  });
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState('');
  const [search, setSearch] = useState('');
  const [archiveFilter, setArchiveFilter] = useState('');
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
      const response = await getCompanyCertificatesService({
        page,
        limit: PAGE_SIZE,
        courseId: filters.courseId || undefined,
        search: filters.search || undefined,
        ...(filters.archived === 'archived' ? { archived: 'true' } : {}),
      });
      const data = mapCompanyCertificatesResponse(response);
      let nextCertificates = data.certificates;
      if (filters.archived === 'active') {
        nextCertificates = nextCertificates.filter(
          (certificate) => !certificate.archived && !certificate.isExpired,
        );
      }
      setCertificates(nextCertificates);
      setMeta(data.meta);
      setArchiveInfo(data.archive);
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
    loadCertificates(1, { courseId, search, archived: archiveFilter });
  }, [courseId, search, archiveFilter, loadCertificates]);

  const courseOptions = useMemo(
    () => [{ courseId: '', courseTitle: 'Tutti i corsi' }, ...courses],
    [courses],
  );

  const handleReset = () => {
    setCourseId('');
    setSearch('');
    setArchiveFilter('');
  };

  const openCertificate = async (certificate) => {
    if (!certificate?.id) return null;
    try {
      const data = await downloadCompanyCertificateService(certificate.id);
      return resolveAssetUrl(data?.pdfUrl || certificate.pdfUrl);
    } catch (error) {
      toast.error(error?.message || 'Download attestato non riuscito');
      return resolveAssetUrl(certificate.pdfUrl);
    }
  };

  const handleDownload = async (certificate) => {
    try {
      setActionId(certificate.id);
      const pdfUrl = await openCertificate(certificate);
      if (!pdfUrl) {
        toast.error('Attestato PDF non disponibile');
        return;
      }
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error(error?.message || 'Download attestato non riuscito');
    } finally {
      setActionId(null);
    }
  };

  const handlePrint = async (certificate) => {
    try {
      setActionId(certificate.id);
      const pdfUrl = await openCertificate(certificate);
      if (!pdfUrl) {
        toast.error('Attestato PDF non disponibile');
        return;
      }
      const printWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      printWindow?.focus();
      printWindow?.print();
    } catch (error) {
      toast.error(error?.message || 'Stampa attestato non riuscita');
    } finally {
      setActionId(null);
    }
  };

  const from = meta.total === 0 ? 0 : (meta.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(meta.page * PAGE_SIZE, meta.total);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">
        Elenco degli attestati
      </h2>

      {!archiveInfo.hasActiveSubscription ? (
        <div className="rounded-xl border border-[#9fd9c1] bg-[#f3f7f5] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[#1f1f1f]">Archivio attestati cloud</p>
              <p className="mt-1 text-sm text-[#666]">
                I dipendenti possono scaricare gli attestati gratuitamente per i primi{' '}
                {archiveInfo.freeDownloadDays} giorni. Come admin azienda puoi sempre scaricare
                gli attestati dei tuoi collaboratori. Attiva l&apos;archivio cloud per conservare
                anche i tuoi attestati personali oltre il periodo gratuito.
              </p>
            </div>
            <Link
              to={ROUTES.COMPANY_ADMIN.ARCHIVE}
              className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
            >
              Acquista archivio
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-[#e6f6ef] px-5 py-3 text-sm text-[#2d5f49]">
          Archivio cloud attivo
          {archiveInfo.expiresAt && (
            <span>
              {' '}
              fino al {new Date(archiveInfo.expiresAt).toLocaleDateString('it-IT')}
            </span>
          )}
        </div>
      )}

      <section className="rounded-xl border border-[#e8e8e8] bg-white p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
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
              Stato archivio
            </p>
            <select
              value={archiveFilter}
              onChange={(event) => setArchiveFilter(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              {ARCHIVE_FILTER_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {option.label}
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
          {certificates.map((certificate) => {
            const badge = getArchiveBadge(certificate);

            return (
              <article key={certificate.id} className="space-y-4">
                <div className="rounded-xl bg-[#edf5f2] p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>
                      {badge.label}
                    </span>
                    {certificate.archived && (
                      <span className="text-xs text-[#666]">
                        Conservato sui server per conformità normativa
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#202020]">
                    <span className="font-semibold">Nominativo utente:</span>{' '}
                    {certificate.employeeName}
                  </p>
                  <p className="mt-1 text-sm text-[#202020]">
                    <span className="font-semibold">ID corsista:</span>{' '}
                    {certificate.userId?.slice(0, 8) || '—'}
                  </p>
                  <p className="mt-1 text-sm text-[#202020]">
                    <span className="font-semibold">Corso:</span>{' '}
                    {certificate.courseTitle}
                  </p>
                  <p className="mt-1 text-sm text-[#202020]">
                    <span className="font-semibold">Data emissione:</span>{' '}
                    {certificate.issuedAtFormatted}
                  </p>
                  {certificate.isExpired && !certificate.archived && (
                    <p className="mt-2 text-xs text-[#b45309]">
                      Il dipendente deve acquistare l&apos;archivio cloud per scaricare di nuovo.
                      Tu, come admin azienda, puoi comunque scaricare questo attestato.
                    </p>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl bg-[#23473f]">
                  <CertificatePreview
                    pdfUrl={resolveAssetUrl(certificate.pdfUrl)}
                    qrCode={certificate.qrCode}
                    courseTitle={certificate.courseTitle}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={actionId === certificate.id || !certificate.canCompanyAdminDownload}
                    onClick={() => handlePrint(certificate)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c] disabled:opacity-60"
                  >
                    <Printer size={14} /> Stampa
                  </button>
                  <button
                    type="button"
                    disabled={actionId === certificate.id || !certificate.canCompanyAdminDownload}
                    onClick={() => handleDownload(certificate)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c] disabled:opacity-60"
                  >
                    <Download size={14} /> Scarica
                  </button>
                </div>
              </article>
            );
          })}
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
            onClick={() => loadCertificates(meta.page - 1, { courseId, search, archived: archiveFilter })}
          >
            Precedente
          </button>
          <span className="h-6 min-w-6 rounded bg-[#73bfa1] px-2 text-center text-sm font-semibold leading-6 text-white">
            {meta.page}
          </span>
          <button
            type="button"
            disabled={meta.page >= meta.totalPages || loading}
            onClick={() => loadCertificates(meta.page + 1, { courseId, search, archived: archiveFilter })}
          >
            Prossimo
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CompanyCertificatesView;
