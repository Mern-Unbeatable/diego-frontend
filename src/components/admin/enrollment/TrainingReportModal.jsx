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
  <label className="block">
    {label ? (
      <span className="mb-1 block text-sm font-semibold text-[#313131]">{label}</span>
    ) : null}
    <input
      value={value || '—'}
      readOnly
      className="h-12 w-full rounded-lg border border-transparent bg-[#edf6f2] px-4 text-sm text-[#66706d]"
    />
  </label>
);

const ProgressRing = ({ percentage = 0 }) => {
  const safeValue = Math.min(100, Math.max(0, Number(percentage) || 0));

  return (
    <div className="relative h-[90px] w-[90px]">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#73bfa1 ${safeValue * 3.6}deg, #e3ebe8 0deg)`,
        }}
      />
      <div className="absolute inset-[9px] flex items-center justify-center rounded-full bg-white text-2xl font-semibold text-[#2f2f2f]">
        {safeValue}%
      </div>
    </div>
  );
};

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
      data.courses?.find((item) => item.enrollmentId === enrollment.enrollmentId) || enrollment;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#143428]/60 p-3 sm:p-6">
      <section className="mx-auto max-w-[1360px] rounded-xl bg-white p-4 sm:p-8">
        <button type="button" onClick={onClose} className="inline-flex text-[#2c2c2c]">
          <ArrowLeft size={18} />
        </button>

        <header className="-mt-4 text-center">
          <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-3xl">
            Rapporto di Formazione Completo
          </h2>
          <p className="mt-1 text-sm text-[#4f4f4f]">Rapporto di Formazione Completo</p>
        </header>

        {isLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : isError ? (
          <p className="mt-6 text-sm text-red-600">{getRtkErrorMessage(error)}</p>
        ) : !report ? (
          <p className="mt-6 text-sm text-[#6b7471]">Nessun dato disponibile.</p>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-[#9fd9c1] px-5 py-2 text-sm font-semibold text-[#73bfa1]"
              >
                Override Manuale
              </button>
              <button
                type="button"
                onClick={handleConfirmReport}
                disabled={isConfirmingReport || !report.signature?.url}
                className="rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isConfirmingReport ? 'Salvataggio...' : 'Salva e conferma'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!certificateAvailable || isDownloading}
                className="rounded-full border border-[#9fd9c1] px-6 py-2 text-sm font-semibold text-[#73bfa1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isDownloading ? 'Download...' : 'Scarica'}
              </button>
            </div>

            <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoField label="" value={report.top.courseTitle} />
              <InfoField label="Azienda" value={report.top.company} />
              <InfoField label="Nome" value={report.top.firstName} />
              <InfoField label="Cognome" value={report.top.lastName} />
              <InfoField label="CIG" value={report.top.cig} />
              <InfoField label="CUP" value={report.top.cup} />
              <div className="md:col-span-2">
                <InfoField label="CIP" value={report.top.cip} />
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
              <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
                Struttura del Corso
              </h3>
              <p className="mt-3 rounded-lg bg-[#f6ecdd] px-4 py-3 text-lg font-medium text-[#d48c21] md:text-xl">
                Struttura del Corso
              </p>
              <p className="mt-3 rounded-lg bg-[#e6ece9] px-4 py-3 text-sm text-[#4e4e4e]">
                Oggetto: {report.subject}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
                <InfoField
                  label="Titolo Piano Formativo"
                  value={report.structure.trainingPlanTitle}
                />
                <InfoField label="ID Piano Formativo" value={report.structure.trainingPlanId} />
                <InfoField
                  label="ID Azione Formativa"
                  value={report.structure.trainingActionId}
                />
                <InfoField
                  label="Titolo Intervento Forma..."
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
                <InfoField label="Data Inizio Corso" value={report.structure.courseStartDate} />

                <InfoField label="Data Fine Corso" value={report.structure.courseEndDate} />
                <InfoField label="Data Fine Corso" value={report.structure.courseEndDate} />
                <InfoField
                  label="CIG* (Codice Identifica..."
                  value={report.top.cig}
                />
                <InfoField
                  label="CUP* (Codice Unico di..."
                  value={report.top.cup}
                />
                <InfoField
                  label="Tipologia* (Autorizzato..."
                  value={report.structure.type}
                />

                <InfoField label="Durata (minuti)" value={report.structure.durationMinutes} />
                <InfoField label="Sede del Corso" value={report.structure.courseLocation} />
                <InfoField label="Settore" value={report.structure.sector} />
                <InfoField label="Fondo" value={report.structure.fund} />
                <InfoField label="Metodologia" value={report.structure.methodology} />
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <InfoField
                  label="Responsabile Progetto Formativo"
                  value={report.structure.projectManager}
                />
                <InfoField label="Tutor" value={report.structure.tutor} />
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
              <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
                Risultati del Test
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                <InfoField label="Nome del Test" value={report.quiz.name} />
                <InfoField label="Data di Accesso" value={report.quiz.accessDate} />
                <div className="hidden lg:block" />
                <InfoField label="Punteggio" value={report.quiz.score} />
                <InfoField label="Risultato" value={report.quiz.result} />
                <InfoField label="Tempo totale" value={report.quiz.totalTime} />
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
              <div className="flex flex-wrap items-center gap-6">
                <ProgressRing percentage={report.progress.percentage} />
                <div className="space-y-1 text-sm text-[#444444]">
                  <p>
                    Data di Accesso:{' '}
                    <span className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                      {report.progress.accessDate}
                    </span>
                  </p>
                  <p>
                    Tempo Trascorso:{' '}
                    <span className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                      {report.progress.timeSpent}
                    </span>
                  </p>
                  <p className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                    Soddisfazione del Partecipante
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
              <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
                Certificati e Documenti
              </h3>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-[#f6ecdd] px-4 py-3">
                  <div>
                    <p className="text-lg font-semibold text-[#2d2d2d] md:text-xl">Certificato</p>
                    <p className="text-sm text-[#5f5f5f]">
                      Scaricato il: {certificateDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!certificateAvailable || isDownloading}
                    className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f6ecdd] px-4 py-3">
                  <div>
                    <p className="text-lg font-semibold text-[#2d2d2d] md:text-xl">
                      Report del corso
                    </p>
                    <p className="text-sm text-[#5f5f5f]">
                      Scaricato il: {certificateDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!certificateAvailable || isDownloading}
                    className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Download
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-[#252525] md:text-2xl">
                <Clock3 size={20} /> Tempo totale di apprendimento
              </h3>
              <div className="mt-3 rounded-lg bg-[#f6ecdd] px-4 py-3">
                <p className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                  {report.totalLearningTime}{' '}
                  <span className="text-base font-normal text-[#3f3f3f] md:text-lg">
                    Ore totali trascorse nel corso
                  </span>
                </p>
                <div className="mt-2 h-[6px] w-full rounded-full bg-[#d9d1c4]">
                  <div
                    className="h-[6px] rounded-full bg-[#73bfa1]"
                    style={{ width: `${Math.min(100, report.progress.percentage)}%` }}
                  />
                </div>
              </div>
            </section>

            <AntiCheatEventsPanel antiCheat={report.antiCheat} />

            <section className="mt-6 rounded-2xl border border-dashed border-[#8f8f8f] p-5">
              <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
                Firma del Partecipante
              </h3>
              <div className="mx-auto mt-4 max-w-[620px] rounded-lg bg-[#f6ecdd] p-5 text-center">
                <p className="text-sm text-[#2f2f2f]">
                  Il partecipante (per accettazione e conferma)
                </p>
                {report.signature?.url ? (
                  <div className="mt-4 space-y-3">
                    <img
                      src={report.signature.url}
                      alt="Firma del partecipante"
                      className="mx-auto max-h-32 rounded-lg border border-[#d9d1c4] bg-white p-3"
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
                  className="mt-4 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploadingSignature
                    ? 'Caricamento...'
                    : report.signature?.url
                      ? 'Sostituisci Firma'
                      : 'Carica Firma'}
                </button>
              </div>
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default TrainingReportModal;
