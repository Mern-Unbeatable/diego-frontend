import { useCallback, useEffect, useRef, useState } from 'react';
import { SCORM_POLL_INTERVAL_MS } from '../../features/learning/trackingConstants';

const buildScormUrl = (session) => {
  if (session?.playerUrl) return session.playerUrl;
  return '';
};

const ScormPlayer = ({
  session,
  enrollmentId,
  lessonId,
  onComplete,
  onPollProgress,
  finishing = false,
}) => {
  const iframeSrc = buildScormUrl(session);
  const [runtimeStatus, setRuntimeStatus] = useState(session?.lastStatus ?? 'NOT_ATTEMPTED');
  const [runtimeScore, setRuntimeScore] = useState(null);
  const completedRef = useRef(false);

  const handleCompletion = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    completedRef.current = false;
    setRuntimeStatus(session?.lastStatus ?? 'NOT_ATTEMPTED');
    setRuntimeScore(null);
  }, [session?.sessionId, session?.lastStatus]);

  useEffect(() => {
    if (!session?.sessionId) return undefined;

    const handleMessage = (event) => {
      const data = event?.data;
      if (!data || data.source !== 'lms-scorm-player') return;
      if (data.sessionId && data.sessionId !== session.sessionId) return;

      if (data.status) {
        setRuntimeStatus(data.status);
      }
      if (data.score != null) {
        setRuntimeScore(data.score);
      }

      if (data.type === 'scorm-complete' || data.completed) {
        handleCompletion();
      }
    };

    window.addEventListener('message', handleMessage);

    const pollTimer = setInterval(async () => {
      if (completedRef.current || !onPollProgress) return;
      try {
        const result = await onPollProgress(enrollmentId, lessonId);
        if (result?.scormStatus) {
          setRuntimeStatus(result.scormStatus);
        }
        if (result?.scormScore != null) {
          setRuntimeScore(result.scormScore);
        }
        if (result?.isCompleted) {
          handleCompletion();
        }
      } catch {
        // ignore polling errors
      }
    }, SCORM_POLL_INTERVAL_MS);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(pollTimer);
    };
  }, [session?.sessionId, enrollmentId, lessonId, onPollProgress, handleCompletion]);

  if (!iframeSrc) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
        {session?.sessionId
          ? 'Avvio player SCORM in corso...'
          : 'Pacchetto SCORM non disponibile. Ricarica la pagina o contatta il supporto.'}
      </div>
    );
  }

  const isDone = ['COMPLETED', 'PASSED'].includes(String(runtimeStatus).toUpperCase());

  return (
    <div className="space-y-4">
      <div
        className="w-full overflow-hidden rounded-2xl bg-white shadow-lg"
        style={{ minHeight: '560px', height: '70vh' }}
      >
        <iframe
          title="SCORM lesson"
          src={iframeSrc}
          className="h-full w-full border-0 bg-white"
          allow="fullscreen"
        />
      </div>
      <div className="rounded-xl border border-[#cbe8dd] bg-[#f2faf7] px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              Tracciamento SCORM attivo: stato{' '}
              <span className="font-semibold text-[#1d1d1d]">{runtimeStatus}</span>
              {runtimeScore != null ? ` · Punteggio ${runtimeScore}` : ''}
            </p>
            <p className="text-xs text-gray-500">
              Il progresso viene salvato automaticamente durante la fruizione del contenuto.
            </p>
          </div>
          {isDone ? (
            <span className="rounded-full bg-[#55B18D] px-4 py-2 text-xs font-semibold text-white">
              Completato
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-800">
              {finishing ? 'Salvataggio...' : 'In corso'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScormPlayer;
