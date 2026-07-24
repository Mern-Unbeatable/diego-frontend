import { useEffect } from 'react';

const buildScormUrl = (packageUrl, entryPoint) => {
  if (!packageUrl) return '';
  const base = packageUrl.endsWith('/') ? packageUrl : `${packageUrl}/`;
  return `${base}${entryPoint || 'index_lms.html'}`;
};

const ScormPlayer = ({ session, onFinish, finishing = false }) => {
  const iframeSrc = buildScormUrl(session?.scormPackageUrl, session?.scormEntryPoint);

  useEffect(() => {
    return () => {
      // Session cleanup handled by explicit finish action
    };
  }, []);

  if (!iframeSrc) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
        Pacchetto SCORM non disponibile
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
        <iframe
          title="SCORM lesson"
          src={iframeSrc}
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-[#cbe8dd] bg-[#f2faf7] px-4 py-3">
        <p className="text-sm text-gray-600">
          Completa il contenuto SCORM, poi conferma per salvare il progresso.
        </p>
        <button
          type="button"
          disabled={finishing}
          onClick={() => onFinish?.(session?.sessionId)}
          className="rounded-full bg-[#55B18D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#439678] disabled:opacity-60"
        >
          {finishing ? 'Salvataggio...' : 'Segna come completata'}
        </button>
      </div>
    </div>
  );
};

export default ScormPlayer;
