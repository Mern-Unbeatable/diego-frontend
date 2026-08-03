import React, { useMemo } from 'react';

/**
 * Shared pagination controls (server or client meta).
 */
export default function Pagination({
  page = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  onPageChange,
  className = '',
  showingLabel,
}) {
  const safeTotalPages = Math.max(1, totalPages || 1);
  const currentPage = Math.min(Math.max(1, page), safeTotalPages);
  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    if (safeTotalPages <= maxButtons) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;
    if (end > safeTotalPages) {
      end = safeTotalPages;
      start = Math.max(1, end - maxButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, safeTotalPages]);

  if (total <= 0 && safeTotalPages <= 1) return null;

  return (
    <div
      className={`flex flex-col items-center justify-between gap-3 border-t border-gray-100 py-4 sm:flex-row sm:gap-4 ${className}`}
    >
      <p className="text-center text-xs text-gray-500 sm:text-left sm:text-sm">
        {showingLabel || `Showing ${from} to ${to} of ${total} results`}
      </p>

      <nav className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Precedente
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange?.(pageNumber)}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
              currentPage === pageNumber
                ? 'bg-[#73bfa1] font-semibold text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= safeTotalPages}
          className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Prossimo
        </button>
      </nav>
    </div>
  );
}
