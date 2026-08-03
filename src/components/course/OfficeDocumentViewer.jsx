import { useMemo } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import SafeEmbeddedViewer from './SafeEmbeddedViewer';
import {
  getOfficeEmbedUrl,
  resolveAbsoluteContentUrl,
} from '../../utils/documentViewerUtils';

const OfficeDocumentViewer = ({ contentUrl, title }) => {
  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);
  const embedUrl = useMemo(() => getOfficeEmbedUrl(contentUrl), [contentUrl]);

  if (!contentUrl) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-white text-sm text-gray-500">
        Documento non disponibile
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 bg-white p-6 text-center">
        <FileText className="h-10 w-10 text-gray-400" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-800">
            Anteprima non disponibile nel browser
          </p>
          <p className="text-xs text-gray-500">
            Apri il file in una nuova scheda. Il tempo di lettura continua su questa pagina.
          </p>
        </div>
        <a
          href={absoluteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#55B18D] px-4 py-2 text-sm font-medium text-white hover:bg-[#469a79]"
        >
          <ExternalLink className="h-4 w-4" />
          Apri documento
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <SafeEmbeddedViewer
        contentUrl={embedUrl}
        title={title}
        className="h-full w-full border-0"
        containerClassName="h-full w-full"
      />
      <div className="absolute right-3 bottom-3">
        <a
          href={absoluteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow ring-1 ring-gray-200 hover:bg-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Apri originale
        </a>
      </div>
    </div>
  );
};

export default OfficeDocumentViewer;
