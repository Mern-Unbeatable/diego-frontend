import React from 'react';

const Pagination = ({ totalItems, itemsPerPage = 10, currentPage = 1, onPageChange }) => {
  if (totalItems <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e4e4e4] px-5 py-4 bg-[#fafafa]">
      <div className="text-sm text-gray-500">
        Showing 1 to {totalItems} of {totalItems} results
      </div>
      <div className="flex items-center gap-1 text-xs">
        <button
          type="button"
          className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled
        >
          &lt; Previous
        </button>
        <button
          type="button"
          className="h-8 w-8 rounded flex items-center justify-center bg-[#73bfa1] text-white font-semibold shadow-sm transition-colors"
        >
          {currentPage}
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
