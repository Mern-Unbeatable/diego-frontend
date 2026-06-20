import React from 'react';

const Label = ({
  htmlFor,
  children,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 block text-gray-700 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

export default Label;
