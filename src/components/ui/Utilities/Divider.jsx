import React from 'react';

const Divider = ({ className = '', text = '', orientation = 'horizontal' }) => {
  if (orientation === 'vertical') {
    return (
      <div className={`mx-2 h-auto border-l border-gray-300 ${className}`} />
    );
  }

  if (text) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 flex-shrink text-sm text-gray-500">{text}</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    );
  }

  return <div className={`border-t border-gray-300 ${className}`} />;
};

export default Divider;
