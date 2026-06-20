import React from 'react';

const Skeleton = ({ type = 'text', className = '' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  if (type === 'circle') {
    return <div className={`${baseClasses} rounded-full ${className}`} />;
  }

  if (type === 'rectangle') {
    return <div className={`${baseClasses} ${className}`} />;
  }

  return <div className={`${baseClasses} h-4 ${className}`} />;
};

export default Skeleton;
