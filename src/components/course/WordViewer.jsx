import { useEffect, useState } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import mammoth from 'mammoth';
import { getFileExtension, resolveAbsoluteContentUrl } from '../../utils/documentViewerUtils';

const WordViewer = ({ contentUrl, title }) => {
  const [html, setHtml] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);
  const extension = getFileExtension(contentUrl);
  const isLegacyDoc = extension === 'doc';

  useEffect(() => {
    let cancelled = false;

    const loadDocument = async () => {
      if (!contentUrl) {
        setError('File Word non disponibile');
        setLoading(false);
        return;
      }

      if (isLegacyDoc) {
        setError('I file .doc (formato legacy) non possono essere visualizzati nel browser. Scarica o apri il file.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setHtml('');

      try {
        const response = await fetch(absoluteUrl);
        if (!response.ok) {
          throw new Error('Impossibile caricare il file Word');
        }

        const buffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml(
          { arrayBuffer: buffer },
          {
            styleMap: [
              "p[style-name='Heading 1'] => h1.doc-heading-1",
              "p[style-name='Heading 2'] => h2.doc-heading-2",
              "p[style-name='Heading 3'] => h3.doc-heading-3",
            ],
          },
        );

        if (!cancelled) {
          if (!result.value?.trim()) {
            setError('Il documento Word è vuoto o non leggibile.');
          } else {
            setHtml(result.value);
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError?.message || 'Errore durante il caricamento del file Word');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      cancelled = true;
    };
  }, [absoluteUrl, contentUrl, isLegacyDoc]);

  if (loading) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-white text-sm text-gray-500">
        Caricamento documento Word...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 bg-white p-6 text-center">
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
            Apri file Word
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-64 flex-col bg-white">
      <div className="flex-1 overflow-auto p-6">
        <article
          className="word-document-content mx-auto max-w-3xl text-sm leading-relaxed text-gray-800 [&_h1.doc-heading-1]:mb-4 [&_h1.doc-heading-1]:text-2xl [&_h1.doc-heading-1]:font-bold [&_h2.doc-heading-2]:mb-3 [&_h2.doc-heading-2]:text-xl [&_h2.doc-heading-2]:font-semibold [&_h3.doc-heading-3]:mb-2 [&_h3.doc-heading-3]:text-lg [&_h3.doc-heading-3]:font-semibold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-2 [&_th]:py-1 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
          aria-label={title || 'Documento Word'}
        />
      </div>

      {absoluteUrl ? (
        <div className="border-t border-gray-200 bg-gray-50 px-3 py-2 text-right">
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#55B18D] hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Scarica / apri originale
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default WordViewer;
