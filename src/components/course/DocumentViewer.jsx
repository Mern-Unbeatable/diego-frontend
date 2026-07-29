import {
  MIN_WATCH_PERCENT,
} from '../../features/learning/trackingConstants';
import SafeEmbeddedViewer from './SafeEmbeddedViewer';
import ExcelViewer from './ExcelViewer';
import WordViewer from './WordViewer';
import OfficeDocumentViewer from './OfficeDocumentViewer';
import {
  getFileExtension,
  isExcelDocumentUrl,
  isWordDocumentUrl,
  resolveAbsoluteContentUrl,
} from '../../utils/documentViewerUtils';

const formatDuration = (secs) => {
  if (!secs || secs <= 0) return '—';
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const rem = secs % 60;
  return rem > 0 ? `${mins}m ${rem}s` : `${mins} min`;
};

const DocumentContent = ({ title, contentUrl, contentType }) => {
  if (!contentUrl) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-white text-sm text-gray-500">
        Documento non disponibile
      </div>
    );
  }

  if (contentType === 'EXCEL' || isExcelDocumentUrl(contentUrl)) {
    return <ExcelViewer contentUrl={contentUrl} title={title} />;
  }

  if (contentType === 'WORD' || isWordDocumentUrl(contentUrl)) {
    return <WordViewer contentUrl={contentUrl} title={title} />;
  }

  if (contentType === 'PDF' || getFileExtension(contentUrl) === 'pdf') {
    return (
      <SafeEmbeddedViewer
        contentUrl={resolveAbsoluteContentUrl(contentUrl)}
        title={title}
        className="h-full w-full border-0"
        containerClassName="h-full w-full"
      />
    );
  }

  const extension = getFileExtension(contentUrl);
  if (['ppt', 'pptx'].includes(extension)) {
    return (
      <OfficeDocumentViewer
        contentUrl={contentUrl}
        title={title}
        contentType="FILE"
      />
    );
  }

  return (
    <SafeEmbeddedViewer
      contentUrl={resolveAbsoluteContentUrl(contentUrl)}
      title={title}
      className="h-full w-full border-0"
      containerClassName="h-full w-full"
    />
  );
};

const DocumentViewer = ({
  title,
  contentUrl,
  contentType,
  watchPercent = 0,
  elapsedSecs = 0,
  minWatchPercent = MIN_WATCH_PERCENT,
  requiredSecs,
}) => {
  const targetSecs = Math.ceil((requiredSecs || 120) * (minWatchPercent / 100));
  const remainingSecs = Math.max(0, targetSecs - elapsedSecs);

  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg">
        <DocumentContent title={title} contentUrl={contentUrl} contentType={contentType} />
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
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <span>
            Tempo trascorso: {formatDuration(elapsedSecs)} / {formatDuration(targetSecs)} richiesti
          </span>
          {remainingSecs > 0 ? (
            <span className="font-medium text-[#5a6a64]">
              Ancora ~{formatDuration(remainingSecs)}
            </span>
          ) : (
            <span className="font-medium text-[#55B18D]">Requisito raggiunto</span>
          )}
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
