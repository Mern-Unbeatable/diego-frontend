import React from 'react';

const Heading = ({ level = 1, children, className = '', h1, h2, h3, h4, h5, h6, ...props }) => {
  // Determine level from props
  let finalLevel = level;
  if (h1) finalLevel = 1;
  if (h2) finalLevel = 2;
  if (h3) finalLevel = 3;
  if (h4) finalLevel = 4;
  if (h5) finalLevel = 5;
  if (h6) finalLevel = 6;

  const Tag = `h${finalLevel}`;

  const sizes = {
    1: 'text-7xl',
    2: 'text-5xl',
    3: 'text-3xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };

  const classes = `${sizes[finalLevel]} ${className}`;

  return (
    <Tag className={classes} {...props}>
      {h1 || h2 || h3 || h4 || h5 || h6 || children}
    </Tag>
  );
};

export default Heading;