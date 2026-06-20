import React from 'react';

const Paragraph = ({
  children,
  variant = 'body',
  className = '',
  ...props
}) => {
  const variants = {
    body: 'text-base ',
    small: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-500',
    error: 'text-sm text-red-600',
  };

  const classes = `${variants[variant]} ${className}`;

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
