import { useEffect, useState } from 'react';
import { ExternalLink, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { fetchAuthenticatedBlob, resolveAbsoluteContentUrl } from '../../utils/documentViewerUtils';

const ExcelViewer = ({ contentUrl, title }) => {
  const [sheets, setSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);

  useEffect(() => {
    let cancelled = false;

    const loadWorkbook = async () => {
      if (!contentUrl) {
        setError('File Excel non disponibile');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setSheets([]);
      setActiveSheet(0);

      try {
        const { blob } = await fetchAuthenticatedBlob(contentUrl, { signal: undefined });
        const buffer = await blob.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const parsedSheets = workbook.SheetNames.map((name) => ({
          name,
          html: XLSX.utils.sheet_to_html(workbook.Sheets[name]),
        }));

        if (!cancelled) {
          setSheets(parsedSheets);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError?.message || 'Errore durante il caricamento del file Excel');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkbook();

    return () => {
      cancelled = true;
    };
  }, [absoluteUrl, contentUrl]);

  if (loading) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-white text-sm text-gray-500">
        Caricamento foglio Excel...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 bg-white p-6 text-center">
        <FileSpreadsheet className="h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-600">{error}</p>
        {absoluteUrl ? (
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#55B18D] px-4 py-2 text-sm font-medium text-white hover:bg-[#469a79]"
          >
            <ExternalLink className="h-4 w-4" />
            Apri file Excel
          </a>
        ) : null}
      </div>
    );
  }

  const currentSheet = sheets[activeSheet];

  return (
    <div className="flex h-full min-h-64 flex-col bg-white">
      {sheets.length > 1 ? (
        <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2">
          {sheets.map((sheet, index) => (
            <button
              key={sheet.name}
              type="button"
              onClick={() => setActiveSheet(index)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                index === activeSheet
                  ? 'bg-[#55B18D] text-white'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100'
              }`}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex-1 overflow-auto p-3">
        {currentSheet ? (
          <div
            className="excel-sheet-content min-w-full text-sm text-gray-800 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left"
            dangerouslySetInnerHTML={{ __html: currentSheet.html }}
            aria-label={title || currentSheet.name}
          />
        ) : (
          <p className="text-sm text-gray-500">Nessun foglio trovato nel file.</p>
        )}
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

export default ExcelViewer;
