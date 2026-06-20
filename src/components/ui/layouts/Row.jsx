import React from 'react';

const Row = ({
  children,
  gap = 4,
  align = 'center',
  justify = 'start',
  wrap = true,
  className = '',
}) => {
  return (
    <div
      className={`flex ${wrap ? 'flex-wrap' : ''} items-${align} justify-${justify} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
};

export default Row;
