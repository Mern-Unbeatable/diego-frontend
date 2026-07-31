import { ArrowLeft, Clock3 } from 'lucide-react';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  useConfirmTrainingReportMutation,
  useGetLicenseeStudentDetailQuery,
  useUploadParticipantSignatureMutation,
} from '../../../features/api/enrollmentApi';
import { mapEnrollmentTrainingReport } from '../../../features/api/enrollmentMappers';
import {
  canDownloadCertificate,
  useCertificateDownload,
} from '../../../features/api/certificateHelpers';
import { getRtkErrorMessage } from '../../../features/api/utils';
import AntiCheatEventsPanel from '../../../components/course/AntiCheatEventsPanel';
import Loading from '../../../components/ui/Utilities/Loading';

const InfoField = ({ label, value }) => (
  <label className="block min-w-0">
    {label ? (
      <span className="mb-1.5 block text-xs font-medium text-[#383838] sm:text-sm">
        {label}
      </span>
    ) : null}
    <input
      value={value || '—'}
      readOnly
      className="h-10 w-full rounded-lg border border-transparent bg-[#edf6f2] px-3 text-sm text-[#66706d] sm:h-11 sm:px-4"
    />
  </label>
);

const ProgressRing = ({ percentage = 0 }) => {
  const safeValue = Math.min(100, Math.max(0, Number(percentage) || 0));

  return (
    <div className="relative h-20 w-20 shrink-0 sm:h-[90px] sm:w-[90px]">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#73bfa1 ${safeValue * 3.6}deg, #e3ebe8 0deg)`,
        }}
      />
      <div className="absolute inset-[8px] flex items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2f2f2f] sm:inset-[9px] sm:text-base">
        {safeValue}%
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <section className="rounded-xl bg-[#f3f7f5] p-4 sm:rounded-2xl sm:p-5">
    {title ? (
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#252525] sm:mb-4 sm:text-lg">
        {Icon ? <Icon size={18} className="shrink-0" /> : null}
        <span className="min-w-0 break-words">{title}</span>
      </h3>
    ) : null}
    {children}
  </section>
);

const TrainingReportModal = ({ open, onClose, studentId, enrollment }) => {
  const signatureInputRef = useRef(null);
  const { downloadById, isDownloading } = useCertificateDownload();
  const { data, isLoading, isError, error } = useGetLicenseeStudentDetailQuery(studentId, {
    skip: !open || !studentId,
  });
  const [uploadSignature, { isLoading: isUploadingSignature }] =
    useUploadParticipantSignatureMutation();
  const [confirmReport, { isLoading: isConfirmingReport }] =
    useConfirmTrainingReportMutation();

  const report = useMemo(() => {
    if (!data?.student || !enrollment) return null;
    const fullEnrollment =
      data.courses?.find((item) => item.enrollmentId === enrollment.enrollmentId) ||
      enrollment;
    return mapEnrollmentTrainingReport(
      { student: data.student, enrollment: fullEnrollment },
      'it',
    );
  }, [data, enrollment]);

  const handleDownload = () => {
    if (report?.certificate) {
      downloadById(report.certificate);
    }
  };

  const handleSignatureSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !enrollment?.enrollmentId) return;

    try {
      await uploadSignature({
        enrollmentId: enrollment.enrollmentId,
        file,
        studentId,
      }).unwrap();
      toast.success('Firma caricata con successo');
    } catch (uploadError) {
      toast.error(getRtkErrorMessage(uploadError));
    } finally {
      event.target.value = '';
    }
  };

  const handleConfirmReport = async () => {
    if (!enrollment?.enrollmentId) return;

    try {
      await confirmReport({
        enrollmentId: enrollment.enrollmentId,
        studentId,
      }).unwrap();
      toast.success('Rapporto confermato con successo');
    } catch (confirmError) {
      toast.error(getRtkErrorMessage(confirmError));
    }
  };

  if (!open) return null;

  const certificateAvailable = canDownloadCertificate(report?.certificate);
  const certificateDate =
    report?.certificate?.lastDownloadedAt || report?.certificate?.issuedAt || '—';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Rapporto di Formazione Completo"
    >
      <section
        className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-gray-100 px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-[#2c2c2c] hover:bg-gray-100"
              aria-label="Chiudi"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h2 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
                Rapporto di Formazione Completo
              </h2>
              <p className="text-xs text-[#4f4f4f] sm:text-sm">
                Dettaglio formazione e risultati
              </p>
            </div>
            <div className="w-9" />
          </div>

          {!isLoading && !isError && report ? (
            <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#9fd9c1] px-4 text-sm font-medium text-[#73bfa1] sm:h-10"
              >
                Override Manuale
              </button>
              <button
                type="button"
                onClick={handleConfirmReport}
                disabled={isConfirmingReport || !report.signature?.url}
                className="inline-flex h-9 items-center justify-center rounded-full bg-[#73bfa1] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-10"
              >
                {isConfirmingReport ? 'Salvataggio...' : 'Salva e conferma'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!certificateAvailable || isDownloading}
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#9fd9c1] px-4 text-sm font-medium text-[#73bfa1] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10"
              >
                {isDownloading ? 'Download...' : 'Scarica'}
              </button>
            </div>
          ) : null}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6">
          {isLoading ? (
            <Loading size="md" className="min-h-40" />
          ) : isError ? (
            <p className="text-sm text-red-600">{getRtkErrorMessage(error)}</p>
          ) : !report ? (
            <p className="text-sm text-[#6b7471]">Nessun dato disponibile.</p>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <InfoField label="Titolo del Corso" value={report.top.courseTitle} />
                <InfoField label="Azienda" value={report.top.company} />
                <InfoField label="Nome" value={report.top.firstName} />
                <InfoField label="Cognome" value={report.top.lastName} />
                <InfoField label="CIG" value={report.top.cig} />
                <InfoField label="CUP" value={report.top.cup} />
                <div className="sm:col-span-2">
                  <InfoField label="CIP" value={report.top.cip} />
                </div>
              </section>

              <SectionCard title="Struttura del Corso">
                <p className="mb-3 rounded-lg bg-[#f6ecdd] px-3 py-2 text-sm font-medium text-[#d48c21] sm:px-4">
                  Struttura del Corso
                </p>
                <p className="mb-4 rounded-lg bg-[#e6ece9] px-3 py-2 text-sm text-[#4e4e4e] sm:px-4">
                  Oggetto: {report.subject}
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <InfoField
                    label="Titolo Piano Formativo"
                    value={report.structure.trainingPlanTitle}
                  />
                  <InfoField
                    label="ID Piano Formativo"
                    value={report.structure.trainingPlanId}
                  />
                  <InfoField
                    label="ID Azione Formativa"
                    value={report.structure.trainingActionId}
                  />
                  <InfoField
                    label="Titolo Intervento Formativo"
                    value={report.structure.courseTitle}
                  />
                  <InfoField
                    label="Azienda di Appartenenza"
                    value={report.structure.company}
                  />
                  <InfoField label="Cognome" value={report.structure.lastName} />
                  <InfoField label="Nome" value={report.structure.firstName} />
                  <InfoField label="Codice Fiscale" value={report.structure.taxCode} />
                  <InfoField label="Data di Nascita" value={report.structure.birthDate} />
                  <InfoField
                    label="Data Inizio Corso"
                    value={report.structure.courseStartDate}
                  />
                  <InfoField
                    label="Data Fine Corso"
                    value={report.structure.courseEndDate}
                  />
                  <InfoField label="CIG*" value={report.top.cig} />
                  <InfoField label="CUP*" value={report.top.cup} />
                  <InfoField label="Tipologia*" value={report.structure.type} />
                  <InfoField
                    label="Durata (minuti)"
                    value={report.structure.durationMinutes}
                  />
                  <InfoField
                    label="Sede del Corso"
                    value={report.structure.courseLocation}
                  />
                  <InfoField label="Settore" value={report.structure.sector} />
                  <InfoField label="Fondo" value={report.structure.fund} />
                  <InfoField label="Metodologia" value={report.structure.methodology} />
                  <div className="sm:col-span-2">
                    <InfoField
                      label="Responsabile Progetto Formativo"
                      value={report.structure.projectManager}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InfoField label="Tutor" value={report.structure.tutor} />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Risultati del Test">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoField label="Nome del Test" value={report.quiz.name} />
                  <InfoField label="Data di Accesso" value={report.quiz.accessDate} />
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <InfoField label="Punteggio" value={report.quiz.score} />
                  <InfoField label="Risultato" value={report.quiz.result} />
                  <InfoField label="Tempo totale" value={report.quiz.totalTime} />
                </div>
              </SectionCard>

              <SectionCard title="Valutazione della Soddisfazione">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <ProgressRing percentage={report.progress.percentage} />
                  <div className="space-y-1 text-sm text-[#444444]">
                    <p>
                      Data di Accesso:{' '}
                      <span className="font-semibold text-[#1f1f1f]">
                        {report.progress.accessDate}
                      </span>
                    </p>
                    <p>
                      Tempo Trascorso:{' '}
                      <span className="font-semibold text-[#1f1f1f]">
                        {report.progress.timeSpent}
                      </span>
                    </p>
                    <p className="font-medium text-[#1f1f1f]">
                      Soddisfazione del Partecipante
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Certificati e Documenti">
                {[
                  { title: 'Certificato', date: certificateDate },
                  { title: 'Report del corso', date: certificateDate },
                ].map((doc) => (
                  <div
                    key={doc.title}
                    className="mb-2 flex flex-col gap-3 rounded-lg bg-[#f6ecdd] px-3 py-3 last:mb-0 sm:mb-3 sm:flex-row sm:items-center sm:justify-between sm:px-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2d2d2d]">{doc.title}</p>
                      <p className="text-xs text-[#5f5f5f] sm:text-sm">
                        Scaricato il: {doc.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={!certificateAvailable || isDownloading}
                      className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#73bfa1] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-auto"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </SectionCard>

              <SectionCard title="Tempo totale di apprendimento" icon={Clock3}>
                <div className="rounded-lg bg-[#f6ecdd] px-3 py-3 sm:px-4">
                  <p className="text-sm text-[#1f1f1f]">
                    <span className="font-semibold">{report.totalLearningTime}</span>{' '}
                    <span className="font-normal text-[#3f3f3f]">
                      Ore totali trascorse nel corso
                    </span>
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[#d9d1c4]">
                    <div
                      className="h-1.5 rounded-full bg-[#73bfa1]"
                      style={{
                        width: `${Math.min(100, report.progress.percentage)}%`,
                      }}
                    />
                  </div>
                </div>
              </SectionCard>

              <AntiCheatEventsPanel antiCheat={report.antiCheat} />

              <section className="rounded-xl border border-dashed border-[#8f8f8f] p-4 sm:rounded-2xl sm:p-5">
                <h3 className="mb-3 text-base font-semibold text-[#252525] sm:text-lg">
                  Firma del Partecipante
                </h3>
                <div className="mx-auto max-w-md rounded-lg bg-[#f6ecdd] p-4 text-center sm:p-5">
                  <p className="text-sm text-[#2f2f2f]">
                    Il partecipante (per accettazione e conferma)
                  </p>
                  {report.signature?.url ? (
                    <div className="mt-4 space-y-3">
                      <img
                        src={report.signature.url}
                        alt="Firma del partecipante"
                        className="mx-auto max-h-28 rounded-lg border border-[#d9d1c4] bg-white p-3 sm:max-h-32"
                      />
                      <p className="text-xs text-[#5f5f5f]">
                        Caricata il: {report.signature.uploadedAt || '—'}
                        {report.signature.confirmedAt ? ' · Confermata' : ''}
                      </p>
                    </div>
                  ) : null}
                  <input
                    ref={signatureInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleSignatureSelect}
                  />
                  <button
                    type="button"
                    onClick={() => signatureInputRef.current?.click()}
                    disabled={isUploadingSignature}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-[#73bfa1] px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-10"
                  >
                    {isUploadingSignature
                      ? 'Caricamento...'
                      : report.signature?.url
                        ? 'Sostituisci Firma'
                        : 'Carica Firma'}
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrainingReportModal;
