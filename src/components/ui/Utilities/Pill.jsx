import React from 'react';

const Pill = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  const classes = `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Pill;
