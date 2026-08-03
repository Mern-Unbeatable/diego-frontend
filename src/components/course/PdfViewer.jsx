import { useEffect, useState } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import {
  fetchAuthenticatedBlob,
  isPdfBlob,
  resolveAbsoluteContentUrl,
} from '../../utils/documentViewerUtils';

const PdfViewer = ({ contentUrl, title }) => {
  const [blobUrl, setBlobUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);

  useEffect(() => {
    let cancelled = false;
    let objectUrl = '';

    const loadPdf = async () => {
      if (!contentUrl) {
        setError('PDF non disponibile');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setBlobUrl('');

      try {
        const { blob } = await fetchAuthenticatedBlob(contentUrl);
        const isPdf = await isPdfBlob(blob);

        if (!isPdf) {
          throw new Error('Il file caricato non è un PDF valido.');
        }

        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) {
          setBlobUrl(objectUrl);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError?.message || 'Errore durante il caricamento del PDF');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [contentUrl]);

  useEffect(
    () => () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    },
    [blobUrl],
  );

  if (loading) {
    return (
      <div className="flex h-full min-h-[480px] items-center justify-center bg-white text-sm text-gray-500">
        Caricamento PDF...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-3 bg-white p-6 text-center">
        <FileText className="h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-600">{error}</p>
        {absoluteUrl ? (
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#55B18D] px-4 py-2 text-sm font-medium text-white hover:bg-[#469a79]"
          >
            <ExternalLink className="h-4 w-4" />
            Apri PDF
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[480px] flex-col bg-white">
      <iframe
        src={`${blobUrl}#toolbar=1&navpanes=0`}
        title={title || 'Documento PDF'}
        className="h-full min-h-[480px] w-full flex-1 border-0 bg-white"
      />
      {absoluteUrl ? (
        <div className="border-t border-gray-200 bg-gray-50 px-3 py-2 text-right">
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#55B18D] hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Apri in nuova scheda
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default PdfViewer;
