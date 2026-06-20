import React, { useState } from 'react';

const Collapse = ({ title, children, defaultOpen = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-lg border ${className}`}>
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      {isOpen && <div className="border-t px-4 py-3">{children}</div>}
    </div>
  );
};

export default Collapse;
