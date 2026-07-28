import {
  MIN_WATCH_PERCENT,
} from '../../features/learning/trackingConstants';

const formatDuration = (secs) => {
  if (!secs || secs <= 0) return '—';
  const mins = Math.ceil(secs / 60);
  return `${mins} min`;
};

const DocumentViewer = ({
  title,
  contentUrl,
  contentType,
  watchPercent = 0,
  minWatchPercent = MIN_WATCH_PERCENT,
  requiredSecs,
}) => {
  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg">
        <iframe
          title={title}
          src={contentUrl}
          className="h-full w-full border-0"
        />
      </div>
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
        <div className="flex items-center justify-between gap-3">
          <span>Tempo di lettura ({contentType})</span>
          <span className="font-semibold text-[#1d1d1d]">{watchPercent}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#55B18D] transition-all"
            style={{ width: `${watchPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Permanenza minima richiesta: {formatDuration(requiredSecs)} ({minWatchPercent}%).
          Il materiale deve restare aperto e visibile sulla piattaforma.
        </p>
      </div>
    </div>
  );
};

export default DocumentViewer;
