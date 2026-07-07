import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const toastContent = (
    <div
      className={`fixed top-4 right-4 z-[9999] rounded-lg p-4 text-white shadow-lg ${types[type]} min-w-64 max-w-sm`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
};

export default Toast;
