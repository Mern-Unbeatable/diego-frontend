import React from 'react';

const Alert = ({ type = 'info', title, message, onClose, className = '' }) => {
  const types = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={`rounded-lg border p-4 ${types[type]} ${className}`}>
      <div className="flex items-start">
        <span className="mr-2">{icons[type]}</span>
        <div className="flex-1">
          {title && <div className="font-semibold">{title}</div>}
          <div>{message}</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-lg hover:opacity-70">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
