import React from 'react';

const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const baseClasses =
    'rounded-full bg-gray-300 flex items-center justify-center';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${baseClasses} ${sizes[size]} ${className} object-cover`}
      />
    );
  }

  return (
    <div className={`${baseClasses} ${sizes[size]} ${className}`}>
      <span className="font-medium text-gray-600">
        {alt ? alt.charAt(0).toUpperCase() : 'U'}
      </span>
    </div>
  );
};

export default Avatar;
