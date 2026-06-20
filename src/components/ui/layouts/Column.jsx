import React from 'react';

const Column = ({ children, span = 1, grow = false, className = '' }) => {
  const classes = grow ? 'flex-1' : `col-span-${span}`;

  return <div className={`${classes} ${className}`}>{children}</div>;
};

export default Column;
